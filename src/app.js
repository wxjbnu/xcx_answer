
import wx from 'labrador';
// import crypto from 'crypto-js';
// console.log(crypto)
import * as config from './config'
export default class {
    globalData = {
        userInfo: null
    };

    async onLaunch() {
        wx.config = config;
        wx.imgurl = 'https://wxupload-1253759887.cosgz.myqcloud.com/'
        wx.host = 'https://17348576.sudaquick.com/' //https://119.29.253.88/
        try {
            const deviceInfo = await wx.getSystemInfo();
            const {windowWidth, windowHeight} = deviceInfo;  // 得到的是 点 为单位 iphone6 => 375
            wx.HEIGHT = windowHeight * 750 / windowWidth;    // 单位为rpx
        } catch (error) {
            console.error(error);
        }

        try {
            const res = await wx.login();
            const {code} = res;
        } catch (error) {
            console.error(error);
        }
    }
}
