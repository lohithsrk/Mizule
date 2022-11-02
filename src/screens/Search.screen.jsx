import { View, StatusBar } from 'react-native';
import React from 'react';

import SearchBox from '../components/search/SearchBox.component';
import Category from '../components/search/Category.component';

import { primary_color } from '../utils/constants.util';

const Search = () => {
	return (
		<View
			style={{
				paddingTop: StatusBar.currentHeight,
				backgroundColor: primary_color,
				flex: 1
			}}
		>
			<SearchBox />
			<Category data={data} />
			<Category data={data} />
		</View>
	);
};

const data = [];

export default Search;
