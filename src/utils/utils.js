
import wx from 'labrador';
import {debug} from './../config';
export function log(...args) {
    if (__DEV__) {
        for (let arg of args) {
            consoleLog(arg);
        }
    }
}
const URL_HOST = ''
export function POST(url, params, onSuccess, onError) {
    const URL = URL_HOST + url;
    wx.request({
        url: URL,
        method: 'POST',
        data: params,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json;charset=utf-8'
        },
        complete: response => {
            log(URL, params, response.data);
            const {message, data, status} = response.data;

            if (status == 200) {
                onSuccess && onSuccess(data);
            }
            else {
                onError && onError(message);
            }
        }
    });
}
export function consoleLog(r){
    if(debug){
        console.log(r)
    }
}
export function login(){
    return new Promise((resolve, reject)=>{
        wx.login({
            complete:function(res){
                consoleLog('wx.login',res)
                if(res.errMsg.indexOf('ok')>-1){
                    // wx.setStorageSync('userinfo', res.userInfo)
                    // getUserinfo().then((r)=>{
                    wx.getUserInfo({
                        complete: function (r) {
                            const userinfo = r.userInfo;
                            consoleLog('login userinfo')
                            consoleLog(userinfo)
                            const data = {
                                        code: res.code,
                                        nick_name:userinfo.nickName,
                                        gender:userinfo.gender,
                                        city:userinfo.city,
                                        province:userinfo.province,
                                        avatarurl:userinfo.avatarUrl
                                    };
                                    consoleLog('request',data)
                            try {
                                wx.setStorageSync('userinfo', userinfo)
                                wx.request({
                                    url: `${wx.host}zerg/public/api/v1/token/user`,
                                    method:'POST',
                                    data: data,
                                    complete: function(r1){
                                        console.log('token', r1)
                                        wx.setStorageSync('token',r1.data)
                                        resolve({token:r1,userInfo:r1.userInfo})
                                    }
                                })
                            } catch (e) {
                                reject(e)
                            }
                        }
                    })
                    // })
                }else{
                    reject(res)
                }
                consoleLog('login complete')
            }
        });
    })
}
export function checkSession(){
    return new Promise((resolve, reject)=>{
        try {
            wx.checkSession({
                complete:function(res){
                    if(res.errMsg.indexOf('ok')>-1){
                        resolve({msg:'已登录'})
                    }else{
                        login().then((res)=>{
                            resolve(res)
                        })
                    }
                    consoleLog('checkSession complete')
                }
            })
        }catch (e) {

        }
    })
}
export function getUserinfo(){
    return new Promise((resolve, reject)=>{
        try {
            var userInfo = wx.getStorageSync('userinfo')
            if (userInfo.hasOwnProperty('nickName')) {
                resolve(r.userInfo)
            }else{
                login().then((res)=>{
                    wx.getUserInfo({
                        complete: function (r) {
                            try {
                                wx.setStorageSync('userinfo', r.userInfo)
                                resolve(r.userInfo)
                            } catch (e) {
                                reject(e)
                            }
                        }
                    })
                })
            }
        }catch(err){
            login().then((res)=>{
                wx.getUserInfo({
                    complete: function (r) {
                        try {
                            wx.setStorageSync('userinfo', r.userInfo)
                            resolve(r.userInfo)
                        } catch (e) {
                            reject(e)
                        }
                    }
                })
            })
        }
    })
    // try {
    //     var userInfo = wx.getStorageSync('userinfo')
    //     if (userInfo.hasOwnProperty('nickName')) {
    //         typeof onSuccess == "function" && onSuccess(userInfo)
    //     }else{
    //         login().then((res)=>{

    //         })
    //         wx.login({
    //             complete: function () {
    //                 consoleLog('wx.login success')
    //                 wx.getUserInfo({
    //                     complete: function (res) {
    //                         try {
    //                             wx.setStorageSync('userinfo', res.userInfo)
    //                             typeof onSuccess == "function" && onSuccess(res.userInfo)
    //                         } catch (e) {
                                
    //                         }
    //                     }
    //                 })
    //             },
    //             fail: function (err) {
    //                 typeof onError == "function" && onError(err)
    //             }
    //         })
    //     }
    // } catch (e) {
    //     wx.login({
    //         success: function () {
    //             wx.getUserInfo({
    //                 success: function (res) {
    //                     consoleLog(res.userInfo)
    //                     try {
    //                         typeof onSuccess == "function" && onSuccess(res.userInfo)
    //                         wx.setStorageSync('userinfo', res.userInfo)
    //                     } catch (e) {
                            
    //                     }
    //                 }
    //             })
    //         },
    //         fail: function (err) {
    //             typeof onError == "function" && onError(err)
    //         }
    //     })
    // }

}

export function showHUDMessage(msg) {
    wx.showToast({
        title: msg,
        icon: 'success',
        duration: 1500
    });
}

export function showHUDLoading() {
    wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 10000
    });
}

export function hideHUDLoading() {
    wx.hideToast();
}


// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}