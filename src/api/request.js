import axios from './url'
// import Vue from 'vue';
import {
    Loading,
} from 'element-ui';

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