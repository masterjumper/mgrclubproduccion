import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import routes from './routes';
//import '../fake-db';
import { Provider } from 'react-redux';
import { store } from './store';

const App = () => {
  const content = useRoutes(routes);

  return (
    <Provider store={store} >
      <SettingsProvider>
        <AuthProvider>
          <MatxTheme>
            <CssBaseline />
            {content}
          </MatxTheme>
        </AuthProvider>
      </SettingsProvider>
    </Provider>
  );
};

export default App;
