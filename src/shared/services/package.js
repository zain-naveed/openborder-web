import { HTTP_Request } from "../util/config";
import { Endpoint } from "../util/endpoint";
const getPackageServices = () => {
  return HTTP_Request.get(Endpoint.getPackagePlan);
};

export { getPackageServices };
