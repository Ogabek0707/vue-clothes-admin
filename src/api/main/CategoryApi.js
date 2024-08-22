import axiosClient from "../ApiClient";

const CategoryApi = {
      getCategory(payload){
            const url = `categories?page=${payload.page}&limit=${payload.limit}`
            return axiosClient.get(url)
      },
      addCategory(payload){
            const url = "category"
            return axiosClient.post(url,payload)
      },
      deleteCategory(payload){
            const url = `category/${payload}`
            return axiosClient.delete(url)
      },
      editCategory(payload){
            const url = "category"
            return axiosClient.put(url,payload)
      }
}
export default CategoryApi