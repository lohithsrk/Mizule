import React from "react";
import Carousel, { getInputRangeFromIndexes } from "react-native-snap-carousel";
import { windowWidth } from "../../utils/constants.util";

const SliderCarousel = ({
  children,
  items,
  setActiveIndex,
  layout,
  sliderWidth,
  itemWidth,
  useScrollView
}) => {
  function scrollInterpolator4(index, carouselProps) {
    const range = [1, 0, -1];
    const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
    const outputRange = range;

    return { inputRange, outputRange };
  }
  function animatedStyles4(index, animatedValue, carouselProps) {
    return {
      zIndex: carouselProps.data.length - index,
      opacity: animatedValue.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0.75, 1, 0.75],
        extrapolate: "clamp",
      }),
      transform: [
        {
          perspective: 1000,
        },
        {
          scale: animatedValue.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [0.65, 1, 0.65],
            extrapolate: "clamp",
          }),
        },
        {
          rotateX: animatedValue.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: ["30deg", "0deg", "30deg"],
            extrapolate: "clamp",
          }),
        },
        {
          rotateY: animatedValue.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: ["-30deg", "0deg", "30deg"],
            extrapolate: "clamp",
          }),
        },
      ],
    };
  }
  return (
    <Carousel
      ref={(ref) => (carousel = ref)}
      data={items}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      renderItem={(item, index) => children(item, index)}
      onSnapToItem={(index) => setActiveIndex(index)}
      scrollInterpolator={scrollInterpolator4}
      slideInterpolatedStyle={animatedStyles4}
      layoutCardOffset={0}
      activeSlideOffset={0}
      enableSnap={true}
      disableIntervalMomentum={true}
      shouldOptimizeUpdates
      removeClippedSubviews={true}
      layout={layout}
      useScrollView={useScrollView}
    />
  );
};

export default SliderCarousel;
