import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WatchZule from '../screens/WatchZule.screen';
import Navbar from '../components/Navbar.component';

const MainNavigation = () => {
	const { Navigator, Screen } = createStackNavigator();

	return (
		<NavigationContainer>
			<Navigator
				detachInactiveScreens={true}
				initialRouteName='Main'
				screenOptions={{ headerShown: false, animationEnabled: false }}
			>
				<Screen name='Main' component={Navbar} />
				<Screen name='WatchZule' component={WatchZule} />
			</Navigator>
		</NavigationContainer>
	);
};

export default MainNavigation;
