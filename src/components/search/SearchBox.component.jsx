import { View, Image, TextInput } from 'react-native';
import React, { useState } from 'react';

import { windowWidth } from '../../utils/constants.util';

const SearchBox = () => {
	const [isSearchBoxFocused, setIsSearchBoxFocused] = useState(true);
	return (
		<View>
			<TextInput
				style={{
					paddingHorizontal: 15,
					backgroundColor: 'rgba(167, 165, 165, 0.593)',
					margin: 20,
					borderRadius: 10,
					
				}}
				placeholder='Search for fun'
			/>
			<Image
				source={{ uri: 'https://img.icons8.com/metro/104/ffffff/search.png' }}
				style={{
					width: 25,
					height: 25,
					position: 'absolute',
					top: 30,
					right: 30
				}}
			/>
		</View>
	);
};

export default SearchBox;
