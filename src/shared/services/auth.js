import { HTTP_Request } from "../util/config";
import { Endpoint } from "../util/endpoint";
const LoginService = (obj) => {
  let formBody = new FormData();
  Object.keys(obj).forEach((key) => {
    formBody.append(key, obj[key]);
  });
  return HTTP_Request.post(Endpoint.Login, formBody);
};
const SignupService = (obj) => {
  let formBody = new FormData();
  Object.keys(obj).forEach((key) => {
    formBody.append(key, obj[key]);
  });
  return HTTP_Request.post(Endpoint.signUP, formBody);
};
const verifyOtpService = (obj) => {
  let formBody = new FormData();
  Object.keys(obj).forEach((key) => {
    formBody.append(key, obj[key]);
  });
  return HTTP_Request.post(Endpoint.verifyOtp, formBody);
};
const sendOtpService = (obj) => {
  let formBody = new FormData();
  Object.keys(obj).forEach((key) => {
    formBody.append(key, obj[key]);
  });
  return HTTP_Request.post(Endpoint.sendOtp, formBody);
};

const recoverPasswordService = (obj) => {
  let formBody = new FormData();
  Object.keys(obj).forEach((key) => {
    formBody.append(key, obj[key]);
  });
  return HTTP_Request.post(Endpoint.recoverPassword, formBody);
};
const forgotPasswordService = (obj) => {
  let formBody = new FormData();
  Object.keys(obj).forEach((key) => {
    formBody.append(key, obj[key]);
  });
  return HTTP_Request.post(Endpoint.forgetPassword, formBody);
};

export { LoginService, SignupService, verifyOtpService, sendOtpService, recoverPasswordService,forgotPasswordService };
