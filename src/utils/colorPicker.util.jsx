import ImageColors from 'react-native-image-colors';

export const colorPicker = async (src) =>
	await ImageColors.getColors(src, {
		fallback: '#000',
		cache: true,
		key: 'unique_key'
	});
