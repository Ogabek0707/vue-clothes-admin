import { defineStore } from 'pinia'
import authApi from '../api/auth/AuthApi'
import Notification from '../plugins/Notification'
import router from '@/router/index'


export const useAuthStore = defineStore({
  id: "auth",
  state:()=>({
    VerificationCode: "",
    Information: JSON.parse(localStorage.getItem('user_info')) || {}, // Saqlangan ma'lumotlarni yuklash
    token: localStorage.getItem('access_token') || null
  }),
  actions: {
    async authLogin(payload) {
      try {
        let res = await authApi.Login(payload)
        if (res?.access_token) {
          localStorage.setItem("access_token", res?.access_token);
          localStorage.setItem("refresh_token", res?.refresh_token);
          localStorage.setItem('user_info', JSON.stringify(res)); // Ma'lumotlarni saqlash
          this.Information = { ...res };
          if(res.role == "admin"){
            Notification({ text: "Successful logged in!!!" }, { type: "success" }, { time: "3500" }, { description: "" });
            setTimeout(() => {
              router.push({ name: "Category" });
            }, 2000);
          }else {
            Notification({ text: "Login is not allowed !!!" }, { type: "danger" }, { time: "4000" }, { description: "Only admins can access the system" });
          }
          console.log(res);
        }
        console.log(res);
      } catch (err) {
        console.log(err);
        if (err.response.data.error === "Data was not found") {
          Notification({ text: "Login is not allowed !!!" }, { type: "danger" }, { time: "3500" }, { description: "Only admins can access the system !!!" });
        } else if (err.response.data.message === "Incorrect password") {
          Notification({ text: "The code is wrong !!!" }, { type: "danger" }, { time: "5000" }, { description: "Enter the correct password !" });
        } else {
          Notification({ text: "Email Error or Code Error !!!" }, { type: "danger" }, { time: "3500" }, { description: "Please enter correct information !!!" });
        }
      }
    }    
  }
})
