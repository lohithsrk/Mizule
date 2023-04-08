import { View, TextInput, Text } from 'react-native';
import React from 'react';

const FormInput = ({ label, placeholder, value, error, touched, ...rest }) => {
	return (
		<View className={`pt-2 ${error && touched === true ? 'pb-0' : 'pb-2'}`}>
			<Text className='mb-1 text-base text-white'>{label}</Text>
			<View className={`border border-zinc-700 pl-3 rounded-md`}>
				<TextInput
					value={value}
					label={label}
					placeholder={placeholder}
					{...rest}
					placeholderTextColor='#9f9f9fc1'
				/>
			</View>
			{error && touched === true && (
				<Text className='text-red-800 mt-1'>{error}</Text>
			)}
		</View>
	);
};

export default FormInput;
