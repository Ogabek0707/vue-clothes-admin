import axiosClient from "../ApiClient";

const ProductViewApi = {
      getProductView(payload){
        console.log(payload);
            const url = `product/${payload}`
            return axiosClient.get(url)
      },
      deleteProduct(payload){
            const url = `product/${payload}`
            return axiosClient.delete(url)
      },
      editProduct(payload){
            const url = "product"
            return axiosClient.put(url,payload)
      }
}
export default ProductViewApi