import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getMyZules } from '../../axios/zuleSpot.axios';
import Header from '../../components/zules/Header.component';
import { base_url, windowWidth } from '../../utils/constants.util';

const MyZules = () => {
	const { user } = useSelector((state) => ({ ...state }));
	const [zules, setZules] = useState([]);

	if (!user.zuleSpot) return;

	useEffect(() => {
		getMyZules(user.zuleSpot.id_zuleSpot, user.id_user, user.token).then(
			({ data }) => {
				if (!data.length) return;
				const zules = data.map((zule) => {
					const zuleTeaser = `${base_url}/zules/${zule.id_zuleSpot}/${user.id_user}/${zule.title}-teaser.mp4`;
					const fullZule = `${base_url}/zules/${zule.id_zuleSpot}/${user.id_user}/${zule.title}-zule.mp4`;
					const zuleThumbnail = `${base_url}/zules/${zule.id_zuleSpot}/${user.id_user}/${zule.title}-zule-thumbnail.jpg`;
					const teaserThumbnail = `${base_url}/zules/${zule.id_zuleSpot}/${user.id_user}/${zule.title}-teaser-thumbnail.jpg`;
					return {
						...zule,
						zuleTeaser,
						fullZule,
						zuleThumbnail,
						teaserThumbnail
					};
				});
				setZules(zules);
			}
		);
	}, []);

	return (
		<View className='flex-1 bg-black p-3'>
			<Text className='text-2xl text-white font-bold'>My Zules</Text>
			<View className='flex-1 mt-5'>
				<ScrollView className='flex-1'>
					<View className='flex-1'>
						{zules.map((zule, i) => {
							return (
								<View key={i} className='flex-row bg-[#272727] p-2 rounded'>
									<Image
										source={{ uri: zule.teaserThumbnail }}
										style={{
											width: windowWidth / 7,
											height: windowWidth / 7 / (9 / 16)
										}}
										className='rounded mr-3'
									/>
									<View>
										<Text className='text-white text-lg'>{zule.title}</Text>
										<Text>{zule.description}</Text>
										<View style={{ flexDirection: 'row' }}>
											{zule.genre?.map((genre, index) => (
												<Text className='text-neutral-400' key={index}>
													{genre}
													{zule.genre.length - 1 !== index && ' • '}
												</Text>
											))}
										</View>
									</View>
								</View>
							);
						})}
					</View>
				</ScrollView>
			</View>
		</View>
	);
};

export default MyZules;
