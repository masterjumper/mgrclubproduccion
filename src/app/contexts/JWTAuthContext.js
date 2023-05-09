import { createContext, useEffect, useReducer } from 'react';
//import axios from 'axios';
//import axios from '../../axios.js';
import axios from 'axios';
//import middleaxios from 'axios';
import { MatxLoading } from 'app/components';
import {Connection} from '../utils/Connection';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null,
  isInitialised: false,
  isAuthenticated: false
};

// const isValidToken = (accessToken) => {
//   if (!accessToken) return false;

//   const decodedToken = jwtDecode(accessToken);
//   const currentTime = Date.now() / 1000;
//   return decodedToken.exp > currentTime;
// };

// const setSession = (accessToken) => {
//   if (accessToken) {
//     localStorage.setItem('accessToken', accessToken);
//     axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   } else {
//     localStorage.removeItem('accessToken');
//     delete axios.defaults.headers.common.Authorization;
//   }
// };

const isValidToken = (accessToken) => {    
  if (!accessToken) {
      return false
  }
  const decodedToken = jwtDecode(accessToken)    
  const currentTime = Date.now() / 1000
  return decodedToken.exp > currentTime

}

const setSession = (accessToken) => {
  if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
     // console.log('JWT AUTH CONTExT aca va el online man');
      //console.log(axios.defaults.headers.common.Authorization);
  } else {        
      localStorage.removeItem('accessToken')
      delete axios.defaults.headers.common.Authorization
  }
}


const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialised: true, user };
    }

    case 'LOGIN': {
      const { user } = action.payload;
      return { ...state, isAuthenticated: true, user };
    }

    case 'LOGOUT': {
      return { ...state, isAuthenticated: false, user: null };
    }

/*     case 'REGISTER': {
      const { user } = action.payload;

      return { ...state, isAuthenticated: true, user };
    } */

    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  /* login: () => {},
  logout: () => {},
  register: () => {}, */
  login: () => Promise.resolve(),  
  logout:() => Promise.resolve(),
  register: () => Promise.resolve(),
  profile: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    const data = { username: email, password: password };
    //const response = await axios.post('/api/auth/login', { email, password });
    //const { user } = response.data;
    //dispatch({ type: 'LOGIN', payload: { user } });
    //const response = await middleaxios.post(Connection + '/login', data)
    const response = await axios.post(Connection + '/login', data)
        const { accessToken, user } = response.data        
        setSession(accessToken)
        dispatch({
            type: 'LOGIN',
            payload: {
                user,
            },
        })
  };

/*   const register = async (email, username, password) => {
    const response = await axios.post('/api/auth/register', { email, username, password });
    const { user } = response.data;

    dispatch({ type: 'REGISTER', payload: { user } });
  }; */

  const profile = async (accessToken) => {
    //const data = { username: email, password: password };                
    //const response = await middleaxios.post(Connection + '/profile',accessToken)        
    const response = await axios.post(Connection + '/profile',accessToken)        
    const { user } = response.data        
    setSession(user)
    dispatch({
        type: 'PROFILE',
        payload: {
            user,
        },
    })        
}

  const logout = async() => {
    const accessToken= localStorage.getItem('accessToken')        
    //await middleaxios.post(Connection + '/logout',  {
    await axios.post(Connection + '/logout',  {
        headers: {
           accessToken,
         }, 
       })
    setSession(null)   
    dispatch({ type: 'LOGOUT' });
  };

  /* useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/api/auth/profile');
        dispatch({ type: 'INIT', payload: { isAuthenticated: true, user: data.user } });
      } catch (err) {
        console.error(err);
        dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
      }
    })();
  }, []); */
  useEffect(() => {
    (async () => {
       try {
           const accessToken = localStorage.getItem('accessToken')
           if (accessToken && isValidToken(accessToken)) {
               setSession(accessToken)                    
               //const response = await middleaxios.get(Connection + '/profile',
               const response = await axios.get(Connection + '/profile',
                {
                headers: {
                   accessToken:accessToken,
                 }, 
               })
               const { user } = response.data                    
               dispatch({
                   type: 'INIT',                        
                   payload: {
                       isAuthenticated: true,
                       user,
                   },
               })
           } else {
               dispatch({
                   type: 'INIT',
                   payload: {
                       isAuthenticated: false,
                       user: null,
                   },
               })
           }
       } catch (err) {                
           dispatch({
               type: 'INIT',
               payload: {
                   isAuthenticated: false,
                   user: null,
               },
           })
       }
   })()
}, [])

  // SHOW LOADER
  if (!state.isInitialised) return <MatxLoading />;

  return (    
    <AuthContext.Provider value={{ ...state, method: 'JWT', login, logout, profile}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
