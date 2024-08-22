import { defineStore } from 'pinia'
import CategoryApi from '@/api/main/CategoryApi'
import Notification from '../plugins/Notification'
import router from '@/router/index'


export const useCategoryStore = defineStore({
  id: "category",
  state:()=>({
    category: [],
  }),
  actions: {
    async getCategory(payload) {
      try {
        let res = await CategoryApi.getCategory(payload)
        this.category = res.categories
        payload.last_page = Math.ceil(res.length / payload.limit)
        console.log(res);
        console.log(this.categoryP.category_id);
      } catch (err) {
        console.log(err);
      }
    },
    async addCategory(payload){
      try{
        let res = await CategoryApi.addCategory(payload)
        console.log(res);
        if(res.category_id){
          Notification({text: "Successful added category !!!"}, {type: "success"},{time: "4000"}, {description: "Successful"})
          setTimeout(() => {
            location.reload()
          }, 2000);
        }else{
          console.log("Hato");
        }
      }catch(err){
        console.log(err.response.data.error);
        if(err.response.data.error == "Unauthorized"){
          Notification({text: "Something wrong !!!"}, {type: "danger"},{time: "4000"}, {description: ""})
        }
      }
    },
    async deleteCategory(payload){
      try{
        let res = await CategoryApi.deleteCategory(payload)
        if(res == true){
          Notification({text: "Successful deleted category !!!"}, {type: "success"},{time: "4000"}, {description: "Successful"})
          setTimeout(() => {
            location.reload()
          }, 2000);
        }else {
          Notification({text: "Something wrong !!!"}, {type: "danger"},{time: "4000"}, {description: "Wrong"})
        }
        console.log(res);
      }catch(err){
        console.log(err)
        if(err){
          Notification({text: "Something wrong !!!"}, {type: "danger"},{time: "4000"}, {description: ""})
        }
      }
    },
    async editCategory(payload){
      try{
        let res = await CategoryApi.editCategory(payload)
        console.log(res);
        if(res.category_id){
          Notification({text: "Successful edit category !!!"}, {type: "success"},{time: "4000"}, {description: "Successful"})
          setTimeout(() => {
            location.reload()
          }, 2000);
        }
      }catch(err){
        console.log(err);
        if(err.response.data.error == "Unauthorized"){
          Notification({text: "Something wrong !!!"}, {type: "danger"},{time: "4000"}, {description: ""})
        }
      }
    },
    
  }
})
