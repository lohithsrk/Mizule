import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Zules from '../screens/zuler/Zules.screen';
import Discover from '../screens/zuler/Discover.screen';
import Setting from '../screens/zuler/Setting.screen';
import Profile from '../screens/zuler/Profile.screen';
import ZuleSpotNav from './ZuleSpot.navigation';

const Tab = createMaterialTopTabNavigator();
const StackTab = createStackNavigator();

const ZulerNav = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName='Zuler'
				screenOptions={{
					headerShown: false,
					animationEnabled: false,
					swipeEnabled: false
				}}
				tabBar={() => null}
			>
				<Tab.Screen name='Zuler' component={ZulerBottomTab} />
				<Tab.Screen name='Setting' component={Setting} />
				<Tab.Screen name='ZuleSpot' component={ZuleSpotNav} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

const ZulerBottomTab = () => {
	return (
		<Tab.Navigator
			initialRouteName='Zules'
			screenOptions={{
				headerShown: false,
				animationEnabled: false,
				tabBarStyle: {
					backgroundColor: '#000'
				},
				tabBarLabelStyle: {
					color: 'white'
				},
				tabBarIndicatorStyle: { opacity: 1, backgroundColor: '#ffffff' },
				swipeEnabled: false
			}}
			tabBarPosition='bottom'
		>
			<Tab.Screen name='Zules' component={Zules} />
			{/* <Tab.Screen name='Discover' component={Discover} /> */}
			<Tab.Screen name='Profile' component={Profile} />
		</Tab.Navigator>
	);
};

export default ZulerNav;
