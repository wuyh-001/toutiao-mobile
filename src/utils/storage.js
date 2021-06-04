/**
 * 本地化存储
 * 
*/

// 设置
export const setItem=(name,value)=>{
    if(typeof value=='object'){
        value=JSON.stringify(value);
    };
    window.localStorage.setItem(name,value)
};

// 获取
export const getItem=name=>{
    let data=window.localStorage.getItem(name);
    try{
        return JSON.parse(data)
    }catch(err){
        return data
    }
};

// 删除指定name的数据
export const removeItem=name=>{
    window.localStorage.removeItem(name)
}


