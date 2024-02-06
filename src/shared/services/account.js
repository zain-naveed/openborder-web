import { HTTP_Request } from "../util/config";
import { Endpoint } from "../util/endpoint";
const getProfileService = () => {
  return HTTP_Request.post(Endpoint.getProfile);
};
const updateProfileService = (obj) => {
  let formBody = new FormData();
  Object.keys(obj).forEach((key) => {
    formBody.append(key, obj[key]);
  });
  return HTTP_Request.post(Endpoint.updateProfile, formBody);
};
export{
    getProfileService,
    updateProfileService
}