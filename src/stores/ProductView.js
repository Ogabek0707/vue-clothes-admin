import { defineStore } from 'pinia'
import ProductViewApi from '@/api/main/ProductVApi'
import Notification from '../plugins/Notification'
import router from '@/router/index'


export const useProductViewStore = defineStore({
  id: "productView",
  state:()=>({
    product: []
  }),
  actions: {
    async getProductView(payload) {
      try {
        let res = await ProductViewApi.getProductView(payload)
        this.product = res
        console.log(res.product_name);
      } catch (err) {
        console.log(err);
        Notification({text: "Something wrong !!!"}, {type: "danger"},{time: "3000"}, {description: ""})
      }
    },

    async deleteProduct(payload){
      try{
        let res = await ProductViewApi.deleteProduct(payload)
        console.log(res);
        if(res == true){
          Notification({text: "Successful deleted Product !!!"}, {type: "success"},{time: "4000"}, {description: "Successful"})
          setTimeout(() => {
            router.push({name: "Products"})
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
    async editProduct(payload){
      try{
        let res = await ProductViewApi.editProduct(payload)
        console.log(res);
        if(res.product_id){
          Notification({text: "Successful changed product !!!"}, {type: "success"},{time: "4000"}, {description: "Successful"})
          setTimeout(() => {
            location.reload()
          }, 2000);
        }
      }catch(err){
        if(err){
          Notification({text: "Something wrong !!!"}, {type: "danger"},{time: "3000"}, {description: ""})
        }
      }
    },
    
  }
})
