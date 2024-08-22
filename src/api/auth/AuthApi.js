import axiosClient from "../ApiClient";

const authApi = {
      Login(payload){
            const url = "login"
            return axiosClient.post(url,payload)
      },
      SignUp(payload){
            const url = "auth/register"
            return axiosClient.post(url,payload)
      },
      ForgotPassword(payload){
            const url = "auth/forgot-password"
            return axiosClient.post(url,payload)
      },
      Verify(payload){
            const url = "auth/verify"
            return axiosClient.post(url,payload)
      }
}
export default authApi