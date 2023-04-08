import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootNav from './src/navigation/Root.navigation';
import store, { persistor } from './src/redux/store';

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<>
					<RootNav />
				</>
			</PersistGate>
		</Provider>
	);
};

export default App;
