import axiosClient from "../ApiClient";

const WorkerApi = {
      getWorker(payload){
            const url = `workers?page=${payload.page}&limit=${payload.limit}`
            return axiosClient.get(url)
      },
      addWorker(payload){
            const url = "worker"
            return axiosClient.post(url,payload)
      },
      deleteWorker(payload){
            const url = `worker/${payload}`
            return axiosClient.delete(url)
      },
      editWorker(payload){
            const url = "worker"
            return axiosClient.put(url,payload)
      }
}
export default WorkerApi