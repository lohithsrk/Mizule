import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import WelcomeScreen from '../screens/auth/Welcome.screen';
import SignIn from '../screens/auth/SignIn.screen';
import SignUp from '../screens/auth/SignUp.screen';
// import OtpScreen from '../screens/auth/Otp.screen';
import VerifyEmail from '../screens/auth/VerifyEmail.screen';
import ResetPassword from '../screens/auth/ResetPassword.screen';

import linking from '../utils/linking.util';

const { Navigator, Screen } = createStackNavigator();

const AuthNav = () => {
	return (
		<NavigationContainer linking={linking}>
			<Navigator
				initialRouteName='WelcomeScreen'
				screenOptions={{ headerShown: false, animationEnabled: false }}
			>
				<Screen name='WelcomeScreen' component={WelcomeScreen} />
				<Screen name='SignIn' component={SignIn} />
				<Screen name='SignUp' component={SignUp} />
				{/* <Screen name='OtpScreen' component={OtpScreen} /> */}
				<Screen name='VerifyEmail' component={VerifyEmail} />
				<Screen name='ResetPassword' component={ResetPassword} />
			</Navigator>
		</NavigationContainer>
	);
};

export default AuthNav;
