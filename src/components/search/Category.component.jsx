import { View, Text, FlatList } from 'react-native';
import React from 'react';

const Category = ({ data }) => {
	return (
		<View>
			<Text>Trending Zules</Text>
			<FlatList
				data={data}
				pagingEnabled
				showsVerticalScrollIndicator={false}
				renderItem={({ item, index }) => <View></View>}
			/>
		</View>
	);
};

export default Category;
