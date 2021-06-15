/**
 * 搜索相关
*/

import request from '@/utils/request';


// 模糊搜索
export const getSuggestionResult = (q) => {
    return request({
        method: 'GET',
        url: '/app/v1_0/suggestion',
        params: {
            q
        }
    })
};

// 获取搜索结果
export const getResults = (params) => {
    return request({
        method: 'GET',
        url: '/app/v1_0/search',
        params
    })
};