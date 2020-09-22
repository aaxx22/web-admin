import axios from './url'
import router from '../router/index.js'

import Vue from 'vue';
import VueRouter from 'vue-router';
import {
    Loading,
    Message
} from 'element-ui';
// import { config } from 'vue/types/umd';
// import {
//     config
// } from 'vue/types/umd';
// console.log(config);
let loading;

function startLoading() { //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(255,255,255,0.5)',
    })
}

function endLoading() { //使用Element loading-close 方法
    loading.close()
}
// 请求拦截器
axios.interceptors.request.use(response => {
    startLoading()
    // Authoritarian
    let tk = localStorage.getItem('token')
    if (tk) {
        response.headers['Authorization'] = "Bearer " + tk;
        // console.log(tk);
    } else {
        // window.history.pushState(null, null, '/login')
        // VueRouter.push('/login')
        window.location.href = '/login'
    }
    console.log(response);
    // config => {
    //     console.log(tk);
    //     if (tk) {
    //         config.headers.Authorization = tk
    //         console.log(tk);
    //     } else {
    //         router.push('/login')
    //     }
    // }

    return response
}, err => {
    return Promise.reject(err);
});
// 响应拦截器
axios.interceptors.response.use(response => {
    endLoading();
    return response
}, err => {
    endLoading();
    console.log(err.response);
    Message({
        type: "error",
        message: err.response ? err.response.data.message : err
    })
    return Promise.reject(err);
});



axios.defaults.headers.common['content-type'] = 'application/json'



// 獲取tree菜單
export const getMenus = function () {
    return new Promise((res, rej) => {
        axios('/menus?pId=c081f0c8-bec5-4f3b-86e6-a28bf5068286&view=tree').then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}
// 登錄
export const login = function (data) {
    return new Promise((res, rej) => {

        axios({
            method: "post",
            url: "/users/login",
            data: {
                ...data
            }
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}
// 獲取部門信息
export const GetDept = function (data) {
    // console.log(data);
    return new Promise((res, rej) => {
        axios({
            method: "post",
            url: "/depts",
            data: {
                ...data
            }
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}
// 編輯部門信息
export const EditDept = function (data) {
    // console.log(data);
    return new Promise((res, rej) => {
        axios({
            method: "post",
            url: "/depts/update",
            data: {
                ...data
            }
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}
// 添加部門
export const AddDept = function (data) {
    // console.log(data);
    return new Promise((res, rej) => {
        axios({
            method: "post",
            url: "/depts/add",
            data: {
                ...data
            }
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}
// 刪除部門
export const removeDept = function (id) {
    // console.log(data);
    return new Promise((res, rej) => {
        axios({
            method: "get",
            url: "/depts/delete?id=" + id
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}
// 獲取職位信息
export const GetPositions = function (data) {
    // console.log(data);
    return new Promise((res, rej) => {
        axios({
            method: "post",
            url: "/positions",
            data: {
                ...data
            }
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}
// 編輯職位信息
export const EditPositions = function (data) {
    // console.log(data);
    return new Promise((res, rej) => {
        axios({
            method: "post",
            url: "/positions/update",
            data: {
                ...data
            }
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}
// 添加職位信息
export const AddPositions = function (data) {
    // console.log(data);
    return new Promise((res, rej) => {
        axios({
            method: "post",
            url: "/positions/add",
            data: {
                ...data
            }
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}
// 刪除職位
export const removePositions = function (id) {
    // console.log(data);
    return new Promise((res, rej) => {
        axios({
            method: "get",
            url: "/positions/delete?id=" + id
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}

// 获取员工数据
export const GetStaff = function (data) {
    // console.log(data);
    return new Promise((res, rej) => {
        axios({
            method: "post",
            url: "/staffs",
            data: {
                ...data
            }
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}
// 添加员工
export const AddStaff = function (data) {
    return new Promise((res, rej) => {
        axios({
            method: "post",
            url: "/staffs/add",
            data: {
                ...data
            }
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}
// 编辑员工资料
export const EditStaff = function (data) {
    // console.log(data);
    return new Promise((res, rej) => {
        axios({
            method: "post",
            url: "/staffs/update",
            data: {
                ...data
            }
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}
// 删除员工
export const removeStaff = function (id) {
    // console.log(data);
    return new Promise((res, rej) => {
        axios({
            method: "get",
            url: "/staffs/delete?id=" + id
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}



// 获取用户列表
export const GetUsers = function (data) {
    // console.log(data);
    return new Promise((res, rej) => {
        axios({
            method: "post",
            url: "/users",
            data: {
                ...data
            }
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}
// 添加用户
export const AddUser = function (data) {
    return new Promise((res, rej) => {
        axios({
            method: "post",
            url: "/users/add",
            data: {
                ...data
            }
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}
// 编辑用户
export const EditUser = function (data) {
    // console.log(data);
    return new Promise((res, rej) => {
        axios({
            method: "post",
            url: "/users/update",
            data: {
                ...data
            }
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}
// 删除用户
export const removeUser = function (id) {
    // console.log(data);
    return new Promise((res, rej) => {
        axios({
            method: "get",
            url: "/users/delete?id=" + id
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}


// 获取用户组列表
export const GetUserGps = function (data) {
    // console.log(data);
    return new Promise((res, rej) => {
        axios({
            method: "post",
            url: "/userGps",
            data: {
                ...data
            }
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}
// 设置区域
export const SetArea = function (data) {
    // console.log(data);
    return new Promise((res, rej) => {
        axios({
            method: "post",
            url: "/areapowers/authPower",
            data: {
                ...data
            }
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}
// 获取区域
export const GetArea = function (id) {
    // console.log(data);
    return new Promise((res, rej) => {
        axios({
            method: "get",
            url: "/areapowers?groupId=" + id,
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}
// 获取用户组权限
export const GetGppowers = function (id) {
    // console.log(data);
    return new Promise((res, rej) => {
        axios({
            method: "get",
            url: "/gppowers?pId=c081f0c8-bec5-4f3b-86e6-a28bf5068286&view=tree&groupId=" + id,
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}
// 编辑用户组权限
export const EditGppowers = function (data) {
    // console.log(data);
    return new Promise((res, rej) => {
        axios({
            method: "post",
            url: "/gppowers/authPower",
            data: {
                ...data
            }
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}

// 添加用户组
export const AddUserGp = function (data) {
    // console.log(data);
    return new Promise((res, rej) => {
        axios({
            method: "post",
            url: "/userGps/add",
            data: {
                ...data
            }
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}
// 编辑用户组
export const EditUserGps = function (data) {
    // console.log(data);
    return new Promise((res, rej) => {
        axios({
            method: "post",
            url: "/userGps/update",
            data: {
                ...data
            }
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}
// 刪除用戶組
export const DelUserGps = function (id) {
    // console.log(data);
    return new Promise((res, rej) => {
        axios({
            method: "get",
            url: "/userGps/delete?id=" + id
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}


export const GetHolidays = function (data) {
    return new Promise((res, rej) => {
        axios({
            method: "post",
            url: "/holidays",
            data: {
                ...data
            },

        }).then(result => {
            res(result)
        }).catch(err => {
            rej(err)
        })
    })
}
export const EditHolidays = function (data) {
    return new Promise((res, rej) => {
        axios({
            method: "post",
            url: "/holidays/update",
            data: {
                ...data
            },

        }).then(result => {
            res(result)
        }).catch(err => {
            rej(err)
        })
    })
}

// 刪除假期
export const DelUserGps = function (id) {
    // console.log(data);
    return new Promise((res, rej) => {
        axios({
            method: "get",
            url: "/holidays/delete?id=" + id
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}

//综合获取
export const combosGet = function (data) {
    // console.log(data);
    return new Promise((res, rej) => {
        axios({
            method: "get",
            url: "/utils/combos?typeKey=" + data,
        }).then((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        });
    })
}