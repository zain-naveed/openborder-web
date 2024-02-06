import {HTTP_CLIENT} from '../util/intercepter'
import {Endpoint} from '../util/endpoint'
import { HTTP_Request } from "../util/config";
// ----------- api call from node.js----------------
const getQuestionService = ()=>{
    return HTTP_CLIENT.get(Endpoint.getQuestion)
}
// ----------- api call from php/laravel----------------
const addOrUpdateQuestionService = (ob)=>{
    let formBody = new FormData();
    Object.entries(ob).forEach(([key,valu])=>{
        formBody.append(key,valu)
    })
  return HTTP_Request.post(Endpoint.addOrUpdateQuestion,formBody)
}
const getQuestionStateService = (ob)=>{
    let formBody = new FormData();
    Object.keys(ob).forEach((key)=>{
        formBody.append(key,ob[key])
    })
  return HTTP_Request.post(Endpoint.getQuestionState,formBody)
}
const deleteStateService = (ob)=>{
    let formBody = new FormData();
    Object.entries(ob).forEach(([key,valu])=>{
        formBody.append(key,valu)
    })
  return HTTP_Request.post(Endpoint.deleteQuestionState,formBody)
}
export {
    getQuestionService,
    addOrUpdateQuestionService,
    getQuestionStateService,
    deleteStateService
}