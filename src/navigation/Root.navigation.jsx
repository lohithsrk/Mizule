import React from 'react';
import { useSelector } from 'react-redux';

import AuthNav from './Auth.navigation';
import ZulerNav from './Zuler.navigation';

const RootNav = () => {
	var { user } = useSelector((state) => ({ ...state }));
	return <>{!user ? <AuthNav /> : <ZulerNav />}</>;
};

export default RootNav;
