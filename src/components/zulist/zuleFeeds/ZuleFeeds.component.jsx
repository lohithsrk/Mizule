import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player/lazy';

import 'swiper/css';
import 'swiper/css/effect-cards';
import './zuleFeed.style.css';

const ZuleFeeds = ({ zules, setZules }) => {
	const [isZuleTeaserPlaying, setIsZuleTeaserPlaying] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	var { user } = useSelector((state) => ({ ...state }));

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setIsZuleTeaserPlaying(!isZuleTeaserPlaying);
	// 	}, 3000);
	// }, [activeIndex]);

	return (
		<div className='w-full h-screen flex items-center justify-center gap-3'>
			{activeIndex < 1 && (
				<div className='p-20 absolute left-1/4 -translate-x-1/2'>
					<h1 className='font-bold text-2xl'>Welcome {user.name}</h1>
					<h2 className='font-semibold text-xl'>Enjoy your Zules</h2>
				</div>
			)}
			<Swiper
				slidesPerView={1}
				spaceBetween={5}
				centeredSlides={true}
				breakpoints={{
					'@0.00': {
						slidesPerView: 1,
						spaceBetween: 10
					},
					'@0.75': {
						slidesPerView: 2,
						spaceBetween: 20
					},
					'@1.00': {
						slidesPerView: 3,
						spaceBetween: 40
					},
					'@1.50': {
						slidesPerView: 8,
						spaceBetween: 50
					}
				}}
				slideToClickedSlide={true}
				onSlideChange={(e) => setActiveIndex(e.activeIndex)}
			>
				{zules.map((zule, i) => {
					return (
						<SwiperSlide key={i}>
							<div
								className={`${
									activeIndex === i
										? 'w-[calc(70vh/(16/9))] h-[calc(70vh)]'
										: 'w-[calc(30vh/(16/9))] h-[calc(30vh)]'
								} rounded-lg overflow-hidden shadow-[inset_0_0_70px_rgba(0,0,0,1)] relative transition-all`}
								key={i}
								onClick={() => setIsZuleTeaserPlaying(!isZuleTeaserPlaying)}
							>
								{isZuleTeaserPlaying && (
									<ReactPlayer
										url={zule.zuleTeaser}
										width='100%'
										height='100%'
										playing={isZuleTeaserPlaying && activeIndex === i}
									/>
								)}
								<img
									src={zule.zuleThumbnail}
									alt={zule.tile}
									className={`absolute left-0 top-0 z-10 w-full h-full object-cover object-center transition-all ${
										isZuleTeaserPlaying && activeIndex === i
											? 'opacity-0'
											: 'opacity-1'
									}`}
								/>
								{activeIndex === i && (
									<div className='absolute z-10 bottom-0 w-full h-full flex justify-end items-start flex-col shadow-[inset_0px_-70px_150px_rgba(0,0,0,0.8),inset_0px_0px_10px_rgba(0,0,0,1)] p-3'>
										<h1 className='font-semibold text-base'>{zule.title}</h1>
										<h2 className='font-normal text-sm'>{zule.description}</h2>
									</div>
								)}
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default ZuleFeeds;
