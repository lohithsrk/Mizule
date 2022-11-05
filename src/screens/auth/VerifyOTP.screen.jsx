import React, { useState, useContext } from 'react';
import { Text, Pressable, View, StatusBar } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useNavigation } from '@react-navigation/native';

import { windowWidth, primary_color } from '../../utils/constants.util';
import { signUpUser } from '../../axios/auth.axios';
import { AuthContext } from '../../context/auth.context';

const VerifyOTP = ({ route }) => {
	const { navigate } = useNavigation();
	const { isLoggedIn, persistUser } = useContext(AuthContext);

	const { otp, values } = route.params;

	const [isOTPValid, setIsOTPValid] = useState(true);
	const [loading, setLoading] = useState(false);

	const handleSignUpSubmit = async (confirmOTP) => {
		setLoading(true);
		await signUpUser(values, otp, parseInt(confirmOTP))
			.then((res) => {
				setLoading(false);
				persistUser(res.data).then(() => {
					isLoggedIn();
				});
			})
			.catch((err) => {
				setLoading(false);
				setIsOTPValid(false);
				console.log(err);
			});
	};

	return (
		<View
			style={{
				flex: 1,
				paddingTop: StatusBar.currentHeight,
				backgroundColor: primary_color,
				padding: 25,
				justifyContent: 'center'
			}}
		>
			<Text
				style={{
					fontSize: 50,
					fontWeight: '700',
					color: 'white'
				}}
			>
				Enter OTP
			</Text>
			<Text style={{ fontSize: 16 }}>OTP is sent to your email</Text>
			<View style={{ flexDirection: 'row' }}>
				<OTPInputView
					style={{ width: windowWidth / 2, height: 70 }}
					pinCount={6}
					// code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
					autoFocusOnLoad
					codeInputFieldStyle={{
						width: 30,
						height: 45,
						borderWidth: 0,
						borderBottomWidth: 2,
						borderColor: 'rgb(150, 150, 150)'
					}}
					codeInputHighlightStyle={{ borderColor: '#ffffff' }}
					onCodeFilled={(code) => handleSignUpSubmit(code)}
					selectionColor={primary_color}
				/>
			</View>
			<Text style={{ fontSize: 16 }}>{isOTPValid ? ' ' : 'Incorrect OTP'}</Text>
			<Pressable
				style={{ marginBottom: 15 }}
				onPress={() => navigate('Signup', { email: values.email })}
			>
				<Text style={{ fontSize: 16 }}>Wrong Email or Password?</Text>
			</Pressable>
		</View>
	);
};

export default VerifyOTP;
