import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';

import FormInput from '../../components/auth/FormInput.component';
import { createZuleSpotValidationSchema } from '../../utils/validationSchema/ZuleSpotValidation.util';
import { createZuleSpot } from '../../axios/zuleSpot.axios';
import { createUser } from '../../redux/reducers/users/user.slice';

const CreateZuleSpot = ({ navigation }) => {
	var { user } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const handleSubmit = async (values) => {
		setLoading(true);
		await createZuleSpot(user.id_user, values.title, user.token)
			.then((res) => {
				setLoading(false);
				dispatch(createUser({ ...user, ...res.data }));
				navigation.replace('ZuleSpotBottomTab');
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				setError('Invalid Zulespot title. Try another one.');
			});
	};

	return (
		<View className='bg-black flex-1 justify-center p-5'>
			<View>
				<Text className='text-white font-semibold text-3xl text-left pb-2'>
					Welcome
				</Text>
				<Text className='text-white font-bold text-4xl text-left pb-2'>
					{user.name}
				</Text>
				<Text className='pb-5 text-base'>
					We appreciate your interest to become a Zulist
				</Text>
			</View>
			<Formik
				initialValues={{
					title: ''
				}}
				onSubmit={(value) => handleSubmit(value)}
				validationSchema={createZuleSpotValidationSchema}
			>
				{({
					handleSubmit,
					handleChange,
					handleBlur,
					values,
					errors,
					isValid,
					touched
				}) => {
					return (
						<View>
							<FormInput
								onChangeText={handleChange('title')}
								onBlur={handleBlur('title')}
								value={values.title}
								keyboardType={'default'}
								label='Zulespot Title'
								placeholder='Zulespot Title'
								handleSubmit={handleSubmit}
								error={errors.title}
								touched={touched.title}
							/>
							{error && <Text className='text-red-800'>{error}</Text>}
							<TouchableOpacity
								className='pt-2 pb-6 flex border border-gray-200 py-2 justify-center items-center bg-white rounded-md mt-2 mb-3'
								onPress={handleSubmit}
								disabled={loading}
							>
								<Text className='font-bold text-lg text-black'>
									{loading ? <ActivityIndicator /> : 'Create my Zulespot'}
								</Text>
							</TouchableOpacity>
						</View>
					);
				}}
			</Formik>
		</View>
	);
};

export default CreateZuleSpot;
