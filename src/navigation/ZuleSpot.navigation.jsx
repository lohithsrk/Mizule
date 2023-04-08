import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import CreateZule from '../screens/zuleSpot/CreateZule.screen';
import CreateZuleSpot from '../screens/zuleSpot/CreateZuleSpot.screen';
import MyZules from '../screens/zuleSpot/MyZules.screen';
import Statistics from '../screens/zuleSpot/Statistics.screen';

const Tab = createMaterialTopTabNavigator();
const StackTab = createStackNavigator();

const ZuleSpotNav = () => {
	return (
		<Tab.Navigator
			initialRouteName='ZuleSpotBottomTab'
			screenOptions={{
				headerShown: false,
				animationEnabled: false,
				swipeEnabled: false
			}}
			tabBar={() => null}
		>
			<Tab.Screen name='CreateZuleSpot' component={CreateZuleSpot} />
			<Tab.Screen name='ZuleSpotBottomTab' component={ZuleSpotBottomTab} />
		</Tab.Navigator>
	);
};

const ZuleSpotBottomTab = () => {
	return (
		<Tab.Navigator
			initialRouteName='My Zules'
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
			{/* <Tab.Screen name='Statistics' component={Statistics} /> */}
			{/* <Tab.Screen name='My Zules' component={MyZules} /> */}
			<Tab.Screen name='Create Zule' component={CreateZule} />
		</Tab.Navigator>
	);
};

export default ZuleSpotNav;
