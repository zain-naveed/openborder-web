import axios from "axios";
import {openEndpoint} from '../util/endpoint';
const getNewsService = ()=>{
  return  axios.get(openEndpoint.getNews)
}
export{
    getNewsService  
}