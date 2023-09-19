import axios from "axios";
import { ElLoading } from 'element-plus'
const config = {
    baseURL: "http://interview-api-t.itheima.net/"
}
class Request {
    instance: any;
    loading: any
    constructor(config: any) {
        this.instance = axios.create(config);
        this.instance.interceptors.request.use((config: any) => {
            let token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = "Bearer " + token;
            }
            this.loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            return config;
        })
        this.instance.interceptors.response.use((res: any) => {
            this.loading.close()
            return res.data;
        }, (err: any) => {
            return Promise.reject(err);
        })
    }
    get(url: string, params: any) {
        return this.instance.get(url, { params })
    }
    post(url: string, params: any) {
        return this.instance.post(url, params)
    }
    put(url: string, params: any) {
        return this.instance.put(url, params)
    }
}
export default new Request(config);