import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	FlatList
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';

import FollowChannelCard from '../channel/FollowChannelCard.component';

import { windowWidth, primary_color } from '../../utils/constants.util';

const CommentSectionModal = ({
	isCommentsSectionOpen,
	setIsCommentsSectionOpen,
	zule
}) => {
	return (
		<Modal
			isVisible={isCommentsSectionOpen}
			onBackdropPress={() => setIsCommentsSectionOpen(!isCommentsSectionOpen)}
			onBackButtonPress={() => setIsCommentsSectionOpen(!isCommentsSectionOpen)}
			onSwipeComplete={() => setIsCommentsSectionOpen(!isCommentsSectionOpen)}
			swipeDirection='down'
			statusBarTranslucent={true}
			backdropOpacity={0}
			style={{
				flex: 1,
				justifyContent: 'flex-end',
				margin: 0
			}}
		>
			<View
				style={{
					padding: 20,
					paddingTop: 10,
					borderRadius: 10,
					backgroundColor: primary_color
				}}
			>
				<View
					style={{
						width: 60,
						height: 5,
						backgroundColor: 'rgba(80, 80, 80, 0.565)',
						borderRadius: 10,
						marginBottom: 10,
						left: windowWidth / 2,
						transform: [{ translateX: -50 }]
					}}
				></View>
				<DescriptionSection zule={zule} />
				<CommentSection
					zule={zule}
					comments={zule.reviews_zules.comments}
				/>
			</View>
		</Modal>
	);
};

const DescriptionSection = ({ zule }) => {
	return (
		<View
			style={{
				backgroundColor: 'rgba(80, 80, 80, 0.565)',
				padding: 15,
				borderRadius: 10
			}}
		>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center'
				}}
			>
				<FollowChannelCard zule={zule} />
				<TouchableOpacity style={{ marginLeft: 5 }}>
					<Text style={{ color: '#1c9cfd' }}>Follow</Text>
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

export default CommentSectionModal;
