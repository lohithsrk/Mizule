import { View } from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import Header from './Header.component';
import { windowWidth } from '../../utils/constants.util';

const LoadingZule = () => {
	return (
		<View className='flex-1 bg-black justify-end p-4'>
			<Header />
			<SkeletonPlaceholder
				borderRadius={100}
				direction='right'
				backgroundColor='#8e8e8e'
				highlightColor='#343434c8'
			>
				<SkeletonPlaceholder.Item
					width={windowWidth / 1.4}
					height={15}
					marginBottom={10}
				/>
				<SkeletonPlaceholder.Item
					flexDirection='row'
					alignItems='center'
					marginBottom={10}
					gap={5}
				>
					<SkeletonPlaceholder.Item width={45} height={45} borderRadius={50} />
					<SkeletonPlaceholder.Item
						width={windowWidth / 2.3}
						height={15}
						justifyContent='center'
					>
						<SkeletonPlaceholder.Item
							width={windowWidth / 2.3}
							height={15}
							marginBottom={5}
						/>
						<SkeletonPlaceholder.Item width={windowWidth / 4} height={15} />
					</SkeletonPlaceholder.Item>
				</SkeletonPlaceholder.Item>
				<SkeletonPlaceholder.Item flexDirection='row' gap={4}>
					<SkeletonPlaceholder.Item width={windowWidth / 4} height={15} />
					<SkeletonPlaceholder.Item width={windowWidth / 4} height={15} />
				</SkeletonPlaceholder.Item>
			</SkeletonPlaceholder>
		</View>
	);
};

export default LoadingZule;
