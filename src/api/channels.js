/**
 * 频道相关
*/

import request from '@/utils/request';


// 获取所有频道
export const getAllChannels=()=>{
    return request({
        method:'GET',
        url:'/app/v1_0/channels'
    })
};

// 设置已登陆的用户的频道
export const setUserChannels=(data)=>{
    return request({
        method:'PATCH',
        url:'/app/v1_0/user/channels',
        data
    })
}

// 删除已登陆的用户的频道
export const deleteUserChannels=(id)=>{
    return request({
        method:'DELETE',
        url:`/app/v1_0/user/channels/${id}`
    })
}