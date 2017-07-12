import wx, {Component, PropTypes} from 'labrador';
import {log, POST, showHUDMessage, showHUDLoading, hideHUDLoading} from '../../utils/utils';
import URL from '../../utils/url-interface';
// import DateSegment from '../../components/dateSegment/dateSegment';
import VenueModel, {VenuePriceModel} from '../../model/VenueModel';
import AlertView from '../../components/alertView/alertView';
import countdown from '../../components/countdown/countdown';
import btn from '../../components/btn/btn';
import immutable from 'seamless-immutable';

import picList from '../../components/picList/picList';
import voiceList from '../../components/voiceList/voiceList';

import {upload} from '../../utils/upload';
import * as config from '../../config'

export default class questionInfo extends Component {

    static propTypes = {
        grade: PropTypes.array,
        subject: PropTypes.array,
    };

    constructor(props) {
        super(props);
        this.state = ({
            userinfo:{
                nickName: 'wxj',
                avatarUrl: "http://wx.qlogo.cn/mmopen/vi_32/NxvlX02XFSdftsicKHh6a1GLicNNJha5TCGibia51tGvawFBaSSmaFU4vwLq52tpf72rAg6rreXk9z2ISotV6I1nMg/0"
            },
            tid:null,//topic id 用来获取问题答案
            questionInfo:{},//问题内容
            answers:[],//回答内容
            hosturl:wx.imgurl,
            content:'',
            imgArr:[],//上传用的
            srcArr:[],//图片数组
            voiceArr:[],//录音数组
        });
    }
    
//初始化时候获取url参数
    onLoad = param => {
        console.log(param)
        // this.state.tid = param.answerId
        this.state.questionInfo = (wx.getStorageSync('question'))
        this.props.grade = config.gradeArr
        this.props.subject = config.subjectArr
        // this.setState({
        //     questionId:param.answerId
        // })
        wx.setNavigationBarTitle('提问');
        this._initData()
    }
    
    onReady = () => {
        // this.headerSrc = this.state.poster
        // this._loadVenusDates();
    };

    children() {
        const srcArr = this.state.questionInfo.image_url || [];
        const voiceArr = this.state.questionInfo.voice_url || [];
        return {
            // 倒计时组件
            countdown:{
                component: countdown,
                props: {
                    ltimer:1493594017083
                }
            },
            btn: {
                component: btn,
                props: {
                    title: '支付',
                    onTap: this._onTap
                }
            },
            picList:{
                component: picList,
                props: {
                    srcArr: srcArr,
                }
            },
            voiceList:{
                component: voiceList,
                props: {
                    voiceArr: voiceArr,
                }
            },
            answerPicList:{
                component: picList,
                props: {
                    local:true,
                    srcArr: this.state.srcArr,
                }
            },
            answerVoiceList:{
                component: voiceList,
                props: {
                    voiceArr: this.state.voiceArr,
                }
            },
            // alertView: {
            //     component: AlertView,
            //     props: {
            //         title: '温馨提示',
            //         content: `如需预订场地请致电管理处电话：${this.contact}，或者到应用市场下载《自在社区》APP在线预订。`,
            //         confirmText: '拨打',
            //         onConfirmTap: this._makeCall
            //     }
            // }
        };
    }
    _initData = ()=>{
        this._getAnswer().then((res)=>{
            console.log(res)
            if(res.errMsg.indexOf('ok')>-1){
                console.log(res)
                this.setState({
                    answers:res.data.answers
                })
            }
        })
    }
    // 回答问题文字
    setCont = event =>{
        console.log(event.detail.value)
        const content = event.detail.value
        this.state.content = content
        this.setState({
            content:content
        })
    }

    // 上传图片
    uploadimg = event =>{
        const that = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                console.log(res);
                var tempFilePaths = res.tempFilePaths
                that.setState({
                    src:tempFilePaths
                })
            },
            fail:function(err){
                console.log(err)
            },
            complete:function(e){
                var tempFilePaths = e.tempFilePaths
                // that.state.srcArr.push(tempFilePaths)
                console.log(tempFilePaths)
                if(tempFilePaths){
                    // 获取文件路径
                    var filePath = tempFilePaths[0];
                    // 获取文件名
                    var fileName = filePath.match(/(wxfile:\/\/)(.+)/)
                    fileName = fileName[2]
                    // 文件上传cos
                    upload(filePath, fileName).then((e)=>{
                        console.log('answer',e)
                        if(e){
                            that.setState({
                                srcArr:[...that.state.srcArr, filePath]
                            })
                            that.setState({
                                imgArr:[...that.state.imgArr, e]
                            })
                        }
                    },(err)=>{
                        console.log('err',err)
                    })
                }
                console.log(e,that.state.srcArr)
            }

        })
    }

    // 预览图片
    preimg = event =>{
        const that = this;
        console.log(event.target.id)
        // console.log(that.state.srcArr[0]);return;
        wx.previewImage({
            // current: '', // 当前显示图片的http链接
            urls: [event.target.id]// 需要预览的图片http链接列表
        })
    }

// 播放录音
    playVoice = event =>{
        let voicesrc = event.target.dataset.id;
        wx.showModal({
            title:'哈哈',
            content:JSON.stringify(event)
        })
        wx.playVoice({
            filePath: voicesrc,
            complete: function(){
            }
        })
    }

    // 获取问题答案
    _getAnswer = () =>{
        const tid = (wx.getStorageSync('question').tid)
        const url = `${wx.host}zerg/public/api/v1/answer/${tid}`
        const token = wx.getStorageSync('token').token
        return new Promise((resolve, reject)=>{
            wx.request({
                url: url, 
                data: {},
                header: {
                    'content-type': 'application/json',
                    'token': token
                },
                complete: function(r){
                    resolve(r)
                }

            })
        })
    }
    
    // 提交问题
    answerQuestion = event =>{
        const url = `${wx.host}zerg/public/api/v1/createanswer`;
        const data = {
            topic_id:this.state.questionInfo.tid,
            title:this.state.questionInfo.title,
            content:this.state.content,
            imageurl:this.state.imgArr.join(),
            userid:22,
        }
        const token = wx.getStorageSync('token').token
        const that = this
        console.log(data)
        wx.request({
            url: url, //仅为示例，并非真实的接口地址
            data: data,
            method:'POST',
            header: {
                'content-type': 'application/json',
                'token': token,
            },
            success: function(res) {
                console.log('success',res.data)
            },
            complete: function(r){
                if(r.errMsg.indexOf('ok')>-1){
                    wx.showToast({
                        title: '回答成功',
                        icon: 'loading',
                        duration: 500,
                        complete: function(res){
                            that._initData()
                            // wx.navigateTo({
                            //     url: `../../pages/answerInfo/answerInfo?topicId=${data.topicId}&title=${'hahah'}`
                            // });
                        }
                    });
                }
                console.log('complete',r)
            }
        })
    }

    formSubmit = event=>{

    }

    formReset = event=>{
        
    }
    // 支付
    _onTap = event =>{

    }
    // _onClickDate = fullDate => {
    //     this._loadVenueDetail(fullDate);
    // };

    /**
     * 获取场地可预订时间信息
     */
    // _loadVenusDates = () => {
    //     const params = {
    //         venueId: this.venueId,
    //         communityId: this.communityId
    //     };

    //     // showHUDLoading();
    //     return;
    //     POST(URL.VENUS_BASIC_INFO, params, data => {
    //         if (data.dates.length > 0) {
    //             this.setState({dates: data.dates, scrollViewH: wx.HEIGHT - 96 - 180});
    //             this._loadVenueDetail(data.dates[0]);
    //         }
    //     }, error => showHUDMessage(error));
    // };
/****
 */
    /**
     * 查询场地一天内的时段信息
     * @param date
     */
    // _loadVenueDetail = date => {
    //     const params = {
    //         venueId: this.venueId,
    //         communityId: this.communityId,
    //         date
    //     };

    //     showHUDLoading();
    //     POST(URL.VENUE_DATA_LIST, params, data => {
    //         const priceModels = data.map(e => new VenuePriceModel(e)).map(e => {
    //             e.priceString = `￥${e.price.toFixed(2)}`;
    //             return e;
    //         });

    //         this.setState({priceModels, hideNoDataTips: priceModels.length > 0});
    //         hideHUDLoading();
    //     }, error => showHUDMessage(error));
    // };

    // _showModal = () => {
    //     wx.showActionSheet({
    //         itemList: ['A', 'B', 'C'],
    //         success: function(res) {
    //             console.log(res.tapIndex)
    //         },
    //         fail: function(res) {
    //             console.log(res.errMsg)
    //         }
    //     })
    //     return;
    //     wx.showModal({
    //         title:'哈哈',
    //         content:'哈哈哈',
    //         confirmColor:'#32e',
    //         success:(res)=>{
    //             wx.openSetting({})
    //         }
    //     })
    //     return;
    //     this._children.alertView.show();
    // }

    // _makeCall = () => {
    //     wx.makePhoneCall({
    //         phoneNumber: this.contact
    //     });
    // }
}