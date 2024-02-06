import { HTTP_Request } from "../util/config";
import { Endpoint } from "../util/endpoint";

const getConsultationService = (obj) => {
  let formBody = new FormData();
  Object.keys(obj).forEach((key) => {
    formBody.append(key, obj[key]);
  });
  return HTTP_Request.post(Endpoint.getConsultationFee, formBody);
};

const serviceHisotryService = () => {
  return HTTP_Request.get(Endpoint.getServiceHistory);
};

export { getConsultationService, serviceHisotryService };
