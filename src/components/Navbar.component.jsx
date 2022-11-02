import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Zules from '../screens/Zules.screen';
import Search from '../screens/Search.screen';
import Account from '../screens/Account.screen';

import { primary_color } from '../utils/constants.util';

const { Navigator, Screen } = createMaterialTopTabNavigator();
const Navbar = () => (
	<Navigator
		tabBarPosition='bottom'
		initialRouteName='Zules'
		screenOptions={{
			tabBarStyle: {
				backgroundColor: primary_color
			},
			tabBarLabelStyle: {
				color: 'white'
			}
		}}
	>
		<Screen name='Zules' component={Zules} />
		<Screen name='Search' component={Search} />
		<Screen name='Account' component={Account} />
	</Navigator>
);

export default Navbar;
