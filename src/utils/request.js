import Axios from 'axios';
import store from '@/store'
import jsonBig from 'json-bigint'


let request = Axios.create({
    baseURL: "http://ttapi.research.itcast.cn/",
    // transformResponse 允许自定义原始的响应数据（字符串）
    transformResponse: [function (data) {
        try {
            // 如果转换成功则返回转换的数据结果
            return jsonBig.parse(data)
        } catch (err) {
            // 如果转换失败，则包装为统一数据格式并返回
            return {
                data
            }
        }
    }]
});


// 请求拦截
request.interceptors.request.use(function (config) {
    const { user } = store.state;
    if (user) {
        config.headers.Authorization = `Bearer ${store.state.user.token}`
    };
    return config
}, function (error) {
    console.log(error)
})


// 相应拦截

export default request;




