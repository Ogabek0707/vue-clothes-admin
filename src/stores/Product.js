import { defineStore } from 'pinia'
import ProductApi from '@/api/main/ProductApi'
import Notification from '../plugins/Notification'
import router from '@/router/index'


export const useProductStore = defineStore({
  id: "product",
  state:()=>({
    product: []
  }),
  actions: {
    async getProductDiscount(payload) {
      try {
        let res = await ProductApi.getProductDiscount(payload)
        this.product = res.products
        payload.last_page = Math.ceil(res.length / payload.limit)
        console.log(res.products);
      } catch (err) {
        console.log(err);
        Notification({text: "Something wrong !!!"}, {type: "danger"},{time: "3000"}, {description: ""})
      }
    },
    async addProduct(payload){
      try{
        let res = await ProductApi.addProduct(payload)
        console.log(res)
        if(res.product_id){
          Notification({text: "Successful added product !!!"}, {type: "success"},{time: "4000"}, {description: "Successful"})
          setTimeout(() => {
            location.reload()
          }, 2000);
        }else{
          console.log("Hato");
        }
      }catch(err){
        console.log(err)
        if(err.response.data.message == "age_max: cannot be blank; age_min: cannot be blank; cost: cannot be blank; count: cannot be blank; description: cannot be blank; discount: cannot be blank; for_gender: cannot be blank; product_name: cannot be blank."){
          Notification({text: "Age Max and Age Min same please change !!!"}, {type: "danger"},{time: "4000"}, {description: ""})
        }else if(err.response.data.message == "age_max: must be no less than 16; for_gender: must be a valid value."){
            Notification({text: "Max Age: must be no less than Min Age; for_gender: must be a valid value. !!!"}, {type: "danger"},{time: "4000"}, {description: ""})
        }else if(err.response.data.message == 'phone number is invalid'){
            Notification({text: "Phone number is invalid !!!"}, {type: "danger"},{time: "4000"}, {description: ""})
        }else {
          Notification({text: "Something wrong !!!"}, {type: "danger"},{time: "4000"}, {description: ""})
        }
      }
    },
    async deleteProduct(payload){
      try{
        let res = await ProductApi.deleteProduct(payload)
        console.log(res);
        if(res == true){
          Notification({text: "Successful deleted Product !!!"}, {type: "success"},{time: "4000"}, {description: "Successful"})
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
    async uploadMedia(payload,id){
      try{
        let res = await ProductApi.uploadMedia(payload,id)
        console.log(res);
        if(res){
          Notification({text: "Media Uploaded Successful !!!"}, {type: "success"},{time: "4000"}, {description: ""})
          setTimeout(() => {
            location.reload()
          }, 2000);
        }
      }catch(err){
        console.log(err);
        if(err){
          Notification({text: "Something wrong !!!"}, {type: "danger"},{time: "4000"}, {description: ""})
        }
      }
    },
    
  }
})
