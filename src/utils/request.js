import Axios from 'axios';
import store from '@/store'



let request=Axios.create({
    baseURL:"http://ttapi.research.itcast.cn/"
});


// 请求拦截
request.interceptors.request.use(function(config){
    const {user}=store.state;
    if(user){
        config.headers.Authorization=`Bearer ${store.state.user.token}`
    };
    return config
},function(error){
    console.log(error)
})


// 相应拦截

export default request;




