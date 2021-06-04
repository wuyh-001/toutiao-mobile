/**
 * 用户相关 
*/

import request from '@/utils/request';


// 登陆注册
export const login=(data)=>{
    return request({
        method:'POST',
        url:'/app/v1_0/authorizations',
        data
    })
}

// 发送验证码
export const sendSms=(mobile)=>{
    return request({
        method:'GET',
        url:`/app/v1_0/sms/codes/${mobile}`
    })
}

// 获取当前用户信息
export const getCurrentUserInfo=()=>{
    return request({
        method:'GET',
        url:'/app/v1_0/user'
    })
}

// 获取用户频道列表
export const getUserChannels=()=>{
    return request({
        method:'GET',
        url:'/app/v1_0/user/channels'
    })
}
