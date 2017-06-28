/**
 * Created by zhouyumin on 17/1/5.
 */

import VenueModel from './VenueModel';

/**
 * 社区内的场馆信息模型
 */
export default class CommunityVenuesInfo {

    constructor(data) {
        if (typeof(data) === 'string') {
            data = JSON.parse(data);
        }

        this.community = new Community(data.community);
        this.service = new Service(data.service);
        this.venueList = data.venueList.map(e => new VenueModel(e));
    }
}

/**
 * 社区信息
 */
export class Community {

    constructor(data) {
        if (!data) {
            data = {};
        }

        this.id = data.id || 0;                     // 社区ID
        this.name = data.name || '';                // 社区名称
        this.phone = data.phone || '';              // 社区管理站手机
        this.tel = data.tel || '';                  // 座机
        this.areaId = data.areaId || 0;             // 地区代码
        this.address = data.address || '';          // 地址
        this.status = data.status || 1;             // 状态
        this.longitude = data.longitude || 0;       // 经度
        this.latitude = data.latitude || 0;         // 纬度
        this.adminId = data.adminId || 0;           // 管理员ID
        this.logo = data.logo || '';                // LOGO
        this.intro = data.intro || '';              // 简介
    }
}

/**
 * 社区服务
 */
export class Service {

    constructor(data) {
        if (!data) {
            data = {};
        }

        this.communityId = data.communityId || 0;
        this.remark = data.remark || '';
        this.serviceId = data.serviceId || 0; // 1.预约场地  2.送水服务  3.申请拜访  4.邀约来访  5.物业缴费  6.工单  7.蜂巢  8.蜜蜂箱

        if (data.contactWay.length > 0) {
            this.contactWay = data.contactWay.split(',');
        }
        else {
            this.contactWay = [];
        }
    }
}