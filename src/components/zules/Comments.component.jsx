import {
	TouchableOpacity,
	Text,
	Image,
	Modal,
	View,
	TextInput,
	FlatList
} from 'react-native';
import React from 'react';

import FollowChannelCard from '../zuleSpot/FollowChannelCard.component';

const Comments = ({ isCommentsOpen, setIsCommentsOpen, zule }) => {
	return (
		<>
			<Modal
				isVisible={isCommentsOpen}
				onBackdropPress={() => setIsCommentsSectionOpen(!isCommentsOpen)}
				onBackButtonPress={() => setIsCommentsSectionOpen(!isCommentsOpen)}
				onSwipeComplete={() => setIsCommentsOpen(!isCommentsOpen)}
				swipeDirection='down'
				statusBarTranslucent={true}
				backdropOpacity={0.5}
				className='justify-end m-0 h-1/2'
			>
				<View className='pt-2 p-4 rounded-lg bg-black flex-1'>
					<View className='w-16 h-1 bg-gray-800 rounded-lg mb-3 left-1/2 -translate-x-12'></View>
					<DescriptionSection zule={zule} />
					<CommentSection zule={zule} comments={zule.reviews.comments} />
				</View>
			</Modal>
		</>
	);
};

const DescriptionSection = ({ zule }) => {
	return (
		<View className='bg-gray-800 p-4 rounded-lg'>
			<View className='flex-row items-center'>
				<FollowChannelCard zule={zule} />
				<TouchableOpacity className='ml-1'>
					<Text className='text-[#1c9cfd]'>Follow</Text>
				</TouchableOpacity>
			</View>
			<Text
				style={{
					fontSize: 20,
					fontWeight: '500',
					textTransform: 'capitalize',
					marginBottom: 3
				}}
			>
				{zule.title}
			</Text>
			<Text
				style={{
					fontSize: 16,
					fontWeight: '300',
					textTransform: 'capitalize'
				}}
			>
				{zule.description}
			</Text>
		</View>
	);
};

const CommentSection = ({ comments }) => {
	return (
		<View>
			<View
				style={{
					backgroundColor: 'rgba(80, 80, 80, 0.565)',
					padding: 15,
					borderRadius: 10,
					marginTop: 15
				}}
			>
				<Text style={{ fontSize: 20, fontWeight: '500' }}>Comments</Text>
				<TextInput
					placeholder='Add your comment'
					style={{
						padding: 10,
						backgroundColor: 'rgba(80, 80, 80, 0.565)',
						borderRadius: 10,
						marginTop: 5
					}}
				/>
				<FlatList
					data={comments}
					renderItem={({ item, index }) => {
						return (
							<View
								style={{
									backgroundColor: 'rgba(80, 80, 80, 0.565)',
									padding: 15,
									borderRadius: 10,
									marginTop: 10
								}}
							>
								<Text style={{ fontSize: 15 }}>{item.id_user}</Text>
								<Text>{item.comment}</Text>
							</View>
						);
					}}
				/>
			</View>
		</View>
	);
};

export default Comments;
