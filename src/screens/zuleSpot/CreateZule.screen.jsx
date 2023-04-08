import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator
} from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import { launchImageLibrary } from 'react-native-image-picker';

import { createZuleValidationSchema } from '../../utils/validationSchema/ZuleSpotValidation.util';
import FormInput from '../../components/auth/FormInput.component';
import { TextInput } from 'react-native-gesture-handler';
import { createZule } from '../../axios/zule.axios';
import { useSelector } from 'react-redux';

const CreateZule = ({ navigation }) => {
	const { user } = useSelector((state) => ({ ...state }));

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [selectedGenre, setSelectedGenre] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);
	const [tag, setTag] = useState('');
	const [CBFC_rating, setCBFC_rating] = useState('');
	const [thumbnail_9_16, setThumbnail_9_16] = useState('');
	const [thumbnail_16_9, setThumbnail_16_9] = useState('');
	const [teaser, setTeaser] = useState('');
	const [zule, setZule] = useState('');
	const data = new FormData();

	const handleThumbnailPicker_16_9 = async () => {
		setError('');
		launchImageLibrary(
			{
				selectionLimit: 1,
				mediaType: 'photo',
				includeBase64: false
			},
			async (res) => {
				if (res.didCancel) {
					return;
				} else if (res.error) {
					return;
				} else if (res.customButton) {
					return;
				} else {
					const h = res.assets[0].height;
					const w = res.assets[0].width;
					// if (w / h === 16 / 9) {
					if (true) {
						const uri = res.assets[0].uri;
						const type = res.assets[0].type;
						const name = res.assets[0].fileName;
						setThumbnail_16_9({ uri, type, name });
					} else {
						return setError(
							'Please upload the files in the mentions aspect ratio of 16/9'
						);
					}
				}
			}
		);
	};
	const handleThumbnailPicker_9_16 = async () => {
		setError('');
		launchImageLibrary(
			{
				selectionLimit: 1,
				mediaType: 'photo',
				includeBase64: false
			},
			async (res) => {
				if (res.didCancel) {
					return;
				} else if (res.error) {
					return;
				} else if (res.customButton) {
					return;
				} else {
					const h = res.assets[0].height;
					const w = res.assets[0].width;
					// if (h / w === 9 / 16) {
					if (true) {
						const uri = res.assets[0].uri;
						const type = res.assets[0].type;
						const name = res.assets[0].fileName;
						setThumbnail_9_16({ uri, type, name });
					} else {
						return setError(
							'Please upload the files in the mentions aspect ratio of 16/9'
						);
					}
				}
			}
		);
	};
	const handleTeaserPicker = async () => {
		setError('');
		launchImageLibrary(
			{
				selectionLimit: 1,
				mediaType: 'video',
				includeBase64: false
			},
			async (res) => {
				if (res.didCancel) {
					return;
				} else if (res.error) {
					return;
				} else if (res.customButton) {
					return;
				} else {
					const h = res.assets[0].height;
					const w = res.assets[0].width;
					// if (w / h === 9 / 16) {
					if (true) {
						const uri = res.assets[0].uri;
						const type = res.assets[0].type;
						const name = res.assets[0].fileName;
						setTeaser({ uri, type, name });
					} else {
						return setError(
							'Please upload the files in the mentions aspect ratio of 16/9'
						);
					}
				}
			}
		);
	};
	const handleZulePicker = async () => {
		setError('');
		launchImageLibrary(
			{
				selectionLimit: 1,
				mediaType: 'video',
				includeBase64: false
			},
			async (res) => {
				if (res.didCancel) {
					return;
				} else if (res.error) {
					return;
				} else if (res.customButton) {
					return;
				} else {
					const h = res.assets[0].height;
					const w = res.assets[0].width;
					// if (w / h === 9 / 16) {
					if (true) {
						const uri = res.assets[0].uri;
						const type = res.assets[0].type;
						const name = res.assets[0].fileName;
						setZule({ uri, type, name });
					} else {
						return setError(
							'Please upload the files in the mentions aspect ratio of 16/9'
						);
					}
				}
			}
		);
	};

	const handleSubmit = async (values) => {
		setLoading(true);
		if (!zule || !teaser || !thumbnail_16_9 || !thumbnail_9_16) {
			return setError('Upload all the files to proceed');
		}
		if (selectedTags.length < 5) {
			return setError('Zule must have atleast 5 tags');
		}
		if (!selectedGenre) {
			return setError('Zule must have a genre');
		}
		data.append('title', values.title);
		data.append('description', values.description);
		data.append('zuleSpot', user.zuleSpot.title);
		data.append('id_user', user.id_user);
		data.append('tags', selectedTags);
		data.append('genre', selectedGenre);
		data.append('CBFC_rating', CBFC_rating);
		data.append('thumbnail_16_9', thumbnail_16_9);
		data.append('thumbnail_9_16', thumbnail_9_16);
		data.append('teaser', teaser);
		data.append('zule', zule);
		setSelectedGenre([]);
		setTag('');
		setCBFC_rating('');
		await createZule(data, user.token)
			.then(({ data }) => {
				setLoading(false);
				if (data !== 'ok') {
					setError('Something went wrong. Please try again');
				}
				navigation.navigate('My Zules');
			})
			.catch((err) => {
				setLoading(false);
			});
	};

	return (
		<View className='bg-black flex-1 p-3'>
			<Text className='text-white text-2xl font-black'>Upload Zule</Text>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className='flex-1'>
					<Formik
						initialValues={{
							title: '',
							description: ''
						}}
						onSubmit={(value) => handleSubmit(value)}
						validationSchema={createZuleValidationSchema}
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
									<FormInput
										onChangeText={handleChange('description')}
										onBlur={handleBlur('description')}
										value={values.description}
										keyboardType={'default'}
										label='Zulespot description'
										placeholder='Zulespot description'
										handleSubmit={handleSubmit}
										error={errors.description}
										touched={touched.description}
										numberOfLines={10}
										multiline={true}
										style={{ textAlignVertical: 'top' }}
									/>
									<View className='my-2 mt-0'>
										<View className='flex-row gap-3 mb-3'>
											<TouchableOpacity
												className={`${
													thumbnail_16_9 ? 'bg-white' : 'bg-[#272727]'
												} p-3 flex-1 rounded items-center justify-center`}
												onPress={handleThumbnailPicker_16_9}
											>
												<Text
													className={`${
														thumbnail_16_9 ? 'text-black' : 'text-white'
													} text-center font-bold`}
												>
													Thumbnail (16:9)
												</Text>
											</TouchableOpacity>
											<TouchableOpacity
												className={`${
													thumbnail_9_16 ? 'bg-white' : 'bg-[#272727]'
												} p-3 flex-1 rounded items-center justify-center`}
												onPress={handleThumbnailPicker_9_16}
											>
												<Text
													className={`${
														thumbnail_9_16 ? 'text-black' : 'text-white'
													} text-center font-bold`}
												>
													Thumbnail (9:16)
												</Text>
											</TouchableOpacity>
										</View>
										<View className='flex-row gap-3'>
											<TouchableOpacity
												className={`${
													teaser ? 'bg-white' : 'bg-[#272727]'
												} p-3 flex-1 rounded items-center justify-center`}
												onPress={handleTeaserPicker}
											>
												<Text
													className={`${
														teaser ? 'text-black' : 'text-white'
													} text-center font-bold`}
												>
													Zule Teaser
												</Text>
											</TouchableOpacity>
											<TouchableOpacity
												className={`${
													zule ? 'bg-white' : 'bg-[#272727]'
												} p-3 flex-1 rounded items-center justify-center`}
												onPress={handleZulePicker}
											>
												<Text
													className={`${
														zule ? 'text-black' : 'text-white'
													} text-center font-bold`}
												>
													Zule
												</Text>
											</TouchableOpacity>
										</View>
									</View>
									<View>
										<Text className='mb-1 text-base text-white'>
											CBFC Rating
										</Text>
										<View className='flex-row flex-wrap'>
											{CBFC_ratings.map((cbfc, i) => (
												<TouchableOpacity
													key={i}
													className={`${
														CBFC_rating === cbfc ? 'bg-white' : 'bg-[#272727]'
													} rounded-full p-2 px-3 m-1`}
													onPress={() => setCBFC_rating(cbfc)}
												>
													<Text
														className={`${
															CBFC_rating === cbfc ? 'text-black' : 'text-white'
														}`}
													>
														{cbfc}
													</Text>
												</TouchableOpacity>
											))}
										</View>
									</View>
									<View>
										<Text className='mb-1 text-base text-white'>Genre</Text>
										<View className='flex-row flex-wrap'>
											{genre.map((g, i) => (
												<TouchableOpacity
													key={i}
													className={`${
														selectedGenre.includes(g)
															? 'bg-white text-black'
															: 'bg-[#272727]'
													} rounded-full p-2 px-3 m-1`}
													onPress={() =>
														setSelectedGenre(
															selectedGenre.includes(g)
																? selectedGenre.filter((sg) => sg !== g)
																: [...selectedGenre, g]
														)
													}
												>
													<Text
														className={`${
															selectedGenre.includes(g)
																? 'text-black'
																: 'text-white'
														}`}
													>
														{g}
													</Text>
												</TouchableOpacity>
											))}
										</View>
									</View>
									<View>
										<Text className='mb-1 text-base mt-2 text-white'>Tags</Text>
										<View className='flex-row w-full my-1'>
											<View
												className={`border border-zinc-700 pl-3 rounded-md flex-1`}
											>
												<TextInput
													onChangeText={(e) => setTag(e)}
													placeholder='Create tag'
													placeholderTextColor='#9f9f9fc1'
													style={{ textAlignVertical: 'center' }}
													value={tag}
												/>
											</View>
											<TouchableOpacity
												className='p-3 px-4 bg-white rounded items-center justify-center ml-3'
												onPress={() => {
													if (tag.length < 3) {
														return setError(
															'Tag should be minimum of 3 characters'
														);
													}
													setSelectedTags([...selectedTags, tag]);
													setTag('');
												}}
											>
												<Text className='text-black'>Add</Text>
											</TouchableOpacity>
										</View>
										<View className='flex-row flex-wrap'>
											{selectedTags.map((t, i) => (
												<TouchableOpacity
													className={`bg-white rounded-full p-2 px-3 m-1`}
													onPress={() =>
														setSelectedTags(
															selectedTags.filter((st) => st !== t)
														)
													}
													key={i}
												>
													<Text className='text-black'>{t}</Text>
												</TouchableOpacity>
											))}
										</View>
									</View>

									{error && <Text className='text-red-800'>{error}</Text>}
									<TouchableOpacity
										className='pt-2 flex border border-gray-200 py-2 justify-center items-center bg-white rounded-md mt-2'
										onPress={handleSubmit}
										disabled={loading}
									>
										<Text className='font-bold text-lg text-black'>
											{loading ? <ActivityIndicator /> : 'Upload'}
										</Text>
									</TouchableOpacity>
								</View>
							);
						}}
					</Formik>
				</View>
			</ScrollView>
		</View>
	);
};

const CBFC_ratings = ['U/A', 'U', 'A', 'R'];

const genre = [
	'Action',
	'Animation',
	'Comedy',
	'Crime',
	'Drama',
	'Fantasy',
	'Historical',
	'Horror',
	'Romance',
	'Thriller'
];

export default CreateZule;
