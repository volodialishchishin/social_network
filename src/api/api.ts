import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '81cb1eba-d16e-447b-b8c3-7c17cf6feee4'
    }
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    followUser(userId: number){
        return instance.post(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },
    unfollowUser(userId: number){
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    }
}

export const loginAPI = {
    me(){
        return instance.get(`auth/me`)
            .then(response => {
                return response.data
            })
    },
    login(email: string, password: string, rememberMe: boolean){
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout(){
        return instance.delete(`auth/login`)
            .then(response => {
                return response.data
            })
    },
    getCaptcha(){
        return instance.get(`security/get-captcha-url`)
            .then(response => {
                return response
        })
    }
}

export const profileAPI = {
    getMeProfile(userId: number){
        return instance.get(`profile/` + userId)
    },
    getMeStatus(userId: number){
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status: string){
        return instance.put(`profile/status/`, {status})
    },
    createPhoto(){
        return instance.put(`/profile/photo`,{image:'https://static.wikia.nocookie.net/mrrobot/images/5/5a/MRPoster.jpg/revision/latest?cb=20160625030409'})
    }
}


