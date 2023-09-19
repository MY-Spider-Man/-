import http from "./http";

interface login {
    password: string,
    username: string
}
export const loginAPI = (params: login) => http.post("/auth/login", params)

export const queryAPI = (params: any) => http.get("/admin/interview/query", params)

export const createAPI = (params: any) => http.post("/admin/interview/create", params)

export const updateAPI = (params: any) => http.put("/admin/interview/update", params)

