import { defineStore } from 'pinia'
import WorkerApi from '@/api/main/WorkerApi'
import Notification from '../plugins/Notification'
import router from '@/router/index'


export const useWorkerStore = defineStore({
  id: "worker",
  state:()=>({
    worker: []
  }),
  actions: {
    async getWorker(payload) {
      try {
        let res = await WorkerApi.getWorker(payload)
        this.worker = res.user
        payload.last_page = Math.ceil(res.length / payload.limit)
        console.log(res);
      } catch (err) {
        console.log(err);
        Notification({text: "Something wrong !!!"}, {type: "danger"},{time: "3000"}, {description: ""})
      }
    },
    async addWorker(payload){
      try{
        let res = await WorkerApi.addWorker(payload)
        console.log(res)
        if(res.user_id){
          Notification({text: "Successful added worker !!!"}, {type: "success"},{time: "4000"}, {description: "Successful"})
          setTimeout(() => {
            location.reload()
          }, 2000);
        }else{
          console.log("Hato");
        }
      }catch(err){
        console.log(err.response)
        if(err.response.data.message == "Eamil already used"){
          Notification({text: "Email already used !!!"}, {type: "danger"},{time: "4000"}, {description: ""})
        }else if(err.response.data.error == "Unauthorized"){
            Notification({text: "Something wrong !!!"}, {type: "danger"},{time: "4000"}, {description: ""})
        }else if(err.response.data.message == 'phone number is invalid'){
            Notification({text: "Phone number is invalid !!!"}, {type: "danger"},{time: "4000"}, {description: ""})
        }
      }
    },
    async deleteWorker(payload){
      try{
        let res = await WorkerApi.deleteWorker(payload)
        console.log(res);
        if(res == true){
          Notification({text: "Successful deleted Worker !!!"}, {type: "success"},{time: "4000"}, {description: "Successful"})
          setTimeout(() => {
            location.reload()
          }, 2000);
        }else {
          Notification({text: "Something wrong !!!"}, {type: "danger"},{time: "4000"}, {description: "Wrong"})
        }
        console.log(res);
      }catch(err){
        console.log(err)
        if(err.response.data.error == "Unauthorized"){
          Notification({text: "Something wrong !!!"}, {type: "danger"},{time: "4000"}, {description: ""})
        }
      }
    },
    async editWorker(payload){
      try{
        let res = await WorkerApi.editWorker(payload)
        console.log(res);
        if(res.id){
          Notification({text: "Successful edit Worker !!!"}, {type: "success"},{time: "4000"}, {description: "Successful"})
          setTimeout(() => {
            location.reload()
          }, 2000);
        }
      }catch(err){
        console.log(err.response.data.message);
        if(err.response.data.message == "email already used"){
          Notification({text: "Email already used !!!"}, {type: "danger"},{time: "4000"}, {description: ""})
        }
      }
    },
    
  }
})
