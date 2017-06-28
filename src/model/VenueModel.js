/**
 * Created by zhouyumin on 17/1/5.
 */

/**
 * 场地基本信息
 */
export default class VenueModel {

    constructor(data) {
        if (!data) {
            data = {};
        }
        if (typeof(data) === 'string') {
            data = JSON.parse(data);
        }

        this.address = data.address || '';
        this.businessBegin = data.businessBegin || '';
        this.businessEnd = data.businessEnd || '';
        this.chargeType = data.chargeType || 1;     // 1 时间段, 2是次数, 3自定义 收费方式
        this.communityId = data.communityId || 0;
        this.id = data.id || 0;                     // 服务的ID
        this.intro = data.intro || '';              // "足球场地"
        this.title = data.title || '';              // "足球"
    }
}

/**
 * 独占场馆的价格和订购状态列表
 */
export class VenuePriceModel {

    constructor(data) {
        if (typeof(data) === 'string') {
            data = JSON.parse(data);
        }

        this.price = data.price || 0;
        this.timeSlice = data.timeSlice || '';      // "08:00-09:00"
        this.venueId = data.venueId || 0;           // 场馆ID
        this.canHire = data.canHire || 0;           // 1:可以租,其他都是不能租
    }
}

/**
 * 非独占场地的价格信息
 */
export class PpvModel {

    constructor(data) {
        if (typeof(data) === 'string') {
            data = JSON.parse(data);
        }

        this.key = data.key || '';
        this.money = data.money || 0;
        this.title = data.title || '';
    }
}