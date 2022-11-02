import { useState } from 'react';
import { Text, Pressable } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import { windowWidth, primary_color } from '../utils/constants.util';

const SubmitOTP = ({
	setIsOTPGenerateRequested,
	handleSubmit,
	loading,
	setConfirmOTP,
	errorMsg
}) => {
	const [isOTPValid, setIsOTPValid] = useState(false);

	return (
		<>
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
			<OTPInputView
				selectionColor={primary_color}
				style={{ width: windowWidth / 2, height: 70 }}
				pinCount={6}
				autoFocusOnLoad={setIsOTPGenerateRequested}
				codeInputFieldStyle={{
					width: 30,
					height: 45,
					borderWidth: 0,
					borderBottomWidth: 2,
					borderColor: 'rgb(150, 150, 150)'
				}}
				codeInputHighlightStyle={{ borderColor: '#ffffff' }}
				onCodeFilled={(code) => {
					setIsOTPValid(true);
					setConfirmOTP(parseInt(code));
				}}
			/>

			<Text
				tyle={{
					color: '#ff0000',
					marginBottom: 12
				}}
			>
				{errorMsg.length ? errorMsg : ' '}
			</Text>
			<Pressable
				style={{ marginBottom: 15 }}
				onPress={() => setIsOTPGenerateRequested(false)}
			>
				<Text style={{ fontSize: 16 }}>Wrong Email or Password?</Text>
			</Pressable>
			<Pressable
				style={{
					backgroundColor: isOTPValid ? 'white' : 'rgb(150,150,150)',
					padding: 10,
					borderRadius: 10
				}}
				onPress={handleSubmit}
				disabled={!loading && !isOTPValid}
			>
				<Text
					style={{
						color: primary_color,
						textAlign: 'center',
						fontSize: 20,
						fontWeight: '700',
						letterSpacing: 1,
						textTransform: 'uppercase'
					}}
				>
					{loading ? 'Rolling In...' : 'Roll In!'}
				</Text>
			</Pressable>
		</>
	);
};

export default SubmitOTP;
