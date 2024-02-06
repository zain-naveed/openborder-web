import axios from "axios";
import { BASE_URL_Backend } from "./constant";
import {store} from '../Redux/store'
export const HTTP_Request = axios.create({
  baseURL: BASE_URL_Backend,
});
// const setupAxios = (userState) => {
    
// };
HTTP_Request.interceptors.request.use(
  (config) => {
    const {user} =  store.getState().root
    // console.log('user',user);
    if(user.access_token){
       
      config.headers.Authorization =  `Bearer ${user.access_token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export const initialConfig = (user) => {
  
  // setupAxios(user);
};

