import React from 'react';
import Video from 'react-native-video';
import { useDispatch, useSelector } from 'react-redux';

import { updateTeaserHistory } from '../../axios/user.axios';
import { updateHistory } from '../../redux/reducers/users/user.slice';

const VideoPlayer = ({
	currentlyPlayingTeaser,
	zule,
	hideThumbnail,
	setHideThumbnail,
	paused
}) => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state }));
	return (
		<Video
			source={{
				uri: currentlyPlayingTeaser ? zule.zuleTeaser : zule.zuleTeaser
			}} // Can be a URL or a local file.
			// ref={(ref) => {}} // Store reference
			// onBuffer={this.onBuffer} // Callback when remote video is buffering
			// onError={this.videoError} // Callback when video cannot be loaded
			onEnd={async () => {
				setHideThumbnail(false);
				await updateTeaserHistory(
					user.id_user,
					zule.id_zule,
					'teaser',
					user.token
				).then((res) => {
					dispatch(
						updateHistory({
							history: res.data.history,
							type: 'teaser'
						})
					);
				});
			}}
			className='h-full w-full'
			resizeMode='cover'
			paused={paused}
		/>
	);
};

export default VideoPlayer;
