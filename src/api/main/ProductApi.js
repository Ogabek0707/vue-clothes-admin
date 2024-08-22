import axiosClient from "../ApiClient";

const ProductApi = {
      getProductDiscount(payload){
            const url = `products?page=${payload.page}&limit=${payload.limit}`
            return axiosClient.get(url)
      },
      addProduct(payload){
            const url = "product"
            return axiosClient.post(url,payload)
      },
      deleteProduct(payload){
            const url = `product/${payload}`
            return axiosClient.delete(url)
      },
      uploadMedia(payload,id){
            const url = `media/upload-photo?id=${id}`
            return axiosClient.post(url,payload)
      }
}
export default ProductApi