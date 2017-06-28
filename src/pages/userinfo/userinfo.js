
import wx, {Component, PropTypes} from 'labrador';
import immutable from 'seamless-immutable';
import {log, POST, getUserinfo, showHUDMessage, showHUDLoading, hideHUDLoading,checkSession,login} from '../../utils/utils';
import URL from '../../utils/url-interface';


import itemList from '../../components/itemList/itemList';


/**
 * 问题列表
 */
export default class userinfo extends Component {


    constructor(props) {
        super(props);
        this.state = immutable({
            tips: 'opo',           // 社区的提示语
            userInfo: {},     // [VenueModel]
            userList:[      //
                // {title:'消息通知',id:1,url:''},
                {title:'订单查询',id:14,url:'../orderList/orderList'},
                {title:'我答',id:12,url:'../answerDetail/answerDetail'},
                {title:'支付',id:13,url:'../pay/pay'}
                
            ]    // [VenueModel]
        });
    }
    /**
     * 传参入口
     * @param params
     */
    onLoad = params => {
        // this.communityId = params.communityId || 1;
    };

    onReady = () => {
        console.log(getUserinfo)
        this._initData();
    };

    onPullDownRefresh(){
        wx.stopPullDownRefresh()
    }

    children() {
        // const items = this.state.questionList || [];
        return {
            listItems: this.state.userList.map((item,index) => {
                return {
                    component: itemList,
                    key: item.id,
                    props: {
                        listObj: item,
                        onClickCell: (item) => { this._onClickCell(item,index) }
                    }
                };
            })
        };
    }

    _onClickCell(item,index){
        console.log('parent',item,index)
        if(this.state.userList[index].url){
            wx.navigateTo({
                url:this.state.userList[index].url
            })
        }
    }

// 赋值用户信息
    // getUser(userInfo){
    //     console.log('userInfo getUser')
    //     console.log(userInfo)
    //     this.setState({
    //         userInfo:userInfo
    //     })
    //     console.log(this.state.userInfo)
    // }

    _initData = () =>{
        const that = this;
        this.contact = '';
        wx.setNavigationBarTitle({title: '123'});
        
        // getUserinfo((userInfo)=>{
        //     that.setState({
        //         userInfo:userInfo
        //     })
        // })

        getUserinfo().then((userInfo)=>{
            that.setState({
                userInfo:userInfo
            })
        })
    }
    // _loadData = () => {
    //     showHUDLoading();
    //     this._initData()
    //     return;
    //     POST(URL.VENUE_INFO_LIST, {communityId: this.communityId}, data => {
    //         const communityVenue = new CommunityVenuesInfo(data);
    //         const {contactWay} = communityVenue.service;
    //         this.contact = contactWay.length > 0 ? contactWay[0] : '';

    //         wx.setNavigationBarTitle({title: communityVenue.community.name});

    //         this.setState({
    //             venuesList: communityVenue.venueList,
    //             tips: communityVenue.service.remark
    //         });

    //         hideHUDLoading();
    //     }, error => showHUDMessage(error));
    // }
}

