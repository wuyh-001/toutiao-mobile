/**
 * 文章相关
*/

import request from '@/utils/request';


// 获取相关频道的文章
export const getArticles=(params)=>{
    return request({
        method:'GET',
        url:'/app/v1_1/articles',
        params
    })
}