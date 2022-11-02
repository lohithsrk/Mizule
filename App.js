import 'react-native-gesture-handler';

import AppNav from './src/navigation/AppNav.navigation';
import { AuthProvider } from './src/context/auth.context';

const App = () => {

  return (
    <AuthProvider >
      <AppNav />
    </AuthProvider>
  )
};

export default App;