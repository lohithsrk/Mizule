import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/auth/Login.screen';
import Signup from '../screens/auth/Signup.screen';
import VerifyOTP from '../screens/auth/VerifyOTP.screen';
import ForgotPassword from '../screens/auth/ForgotPassword.screen';

const AuthNavigation = () => {
	const { Navigator, Screen } = createStackNavigator();

	return (
		<NavigationContainer>
			<Navigator
				detachInactiveScreens={true}
				initialRouteName='Login'
				screenOptions={{ headerShown: false, animationEnabled: false }}
			>
				<Screen name='Login' component={Login} />
				<Screen name='Signup' component={Signup} />
				<Screen name='VerifyOTP' component={VerifyOTP} />
				<Screen name='ForgotPassword' component={ForgotPassword} />
			</Navigator>
		</NavigationContainer>
	);
};

export default AuthNavigation;
