import wx, {Component, PropTypes} from 'labrador';
import {log, POST, showHUDMessage, showHUDLoading, hideHUDLoading} from '../../utils/utils';
import URL from '../../utils/url-interface';
import immutable from 'seamless-immutable';
//import { connect } from 'labrador-redux';

import answerItem from '../../components/answerItem/answerItem';
import * as config from '../../config'

// const { any } = PropTypes;

class Main extends Component {

  static propTypes = {
    // gradename: PropTypes.array,
    // gradeno: PropTypes.array,
    grade: PropTypes.array,
    subject: PropTypes.array,
    orderType: PropTypes.array,
  };

  // static defaultProps = {
  //   grade: ['小学','初中','高中']
  // };

  constructor(props) {
    super(props);
    this.state = {
        pageIndex:1,
        more:true,
        searchBarHeight:'300',
        pageHeight:wx.HEIGHT-300,
        questionArr: [],
        data:{
          // gradename: null,
          // gradeno: null,
          grade:0,//年级
          subject: 0,//学科
          orderType:0,//排序
        },
        // gradename:'选择年级、学科',
    };
  }

  children() {
    const items = this.state.questionArr || [];
      return {
          // 倒计时组件
          listItems: items.map((item) => {
              return {
                  component: answerItem,
                  key: item.id,
                  props: {
                      answerModel: item,
                      isAnswer:true,
                      onClickCell: this._onClickCell
                  }
              };
          })
      };
  }

  onLoad() {
    // 暂时不用
    // this.props.gradename = ['小学','初中','高中']
    // this.props.gradeno = ['一年级','二年级','三年级','四年级','五年级','六年级']

    this.props.grade = config.gradeArr
    this.props.subject = config.subjectArr
    this.props.orderType = config.orderType
    this.setState({
      questionArr:[]
    })
    this._getGrade()
    this._getList()
  }

  onReady() {

  }

  onUpdate() {
    this._getGrade()
  }

  onShow() {
    try {
      var value = wx.getStorageSync('grade')
      if (value) {
          // Do something with return value
          console.log(value)
          // this.state.data = value
          // this.stateChange(value)
      }
    } catch (e) {
      // Do something when catch error
    }
    this._getGrade()
  }

  // onHide() {
  // }

  // onUnload() {
  // }

  _getList = ()=>{
    console.log(this.state.data.orderType)
    const url = `${wx.host}zerg/public/api/v1/answeredtopic/${this.state.pageIndex}/${this.state.data.orderType}/${this.state.data.grade}/${this.state.data.subject}`
    const that = this
    let arr = []
    console.log(url)
    const token = wx.getStorageSync('token').token
    that.state.more = false
    wx.showLoading({
      title:'加载中',
      mask:true
    })
    wx.request({
      url: url, 
      data: {},
      header: {
          'content-type': 'application/json',
          'token': token
      },
      success: function(res) {
        console.log('success',res.data)
      },
      complete: function(r){
        wx.hideLoading()
        if(r.errMsg.indexOf('ok')>-1){
          r.data.map((e)=>{
            arr.push({
              title:e.question.speak.title,
              id:e.question.speak.id,
              des:e.question.speak.content,
              grade:e.grade,
              subject:e.subject,
              stop_time:(e.question.stop_time),
              timer:+new Date(e.question.stop_time),
              price:e.price,
              image_url:e.question.speak.image,
              voice_url:e.question.speak.voice_url,
            })
          })
          if(arr.length<10){
            that.state.more = false
          }else{
            that.state.more = true
          }
          arr = that.state.questionArr.concat(arr)
          that.setState({
            questionArr:arr
          })
        }
        console.log('complete',r)
      }
    })
  }
  _getGrade = ()=>{
    // 选择年级科目提问
    const that = this;
    try {
      var value = wx.getStorageSync('grade')
      if (value) {
          // Do something with return value
          // let data = {
          //   grade:value.gName,
          //   gradeno:value.gnName,
          //   subject:value.sName,
          // }
          // const gradename = (value.gName+value.gnName+value.sName) || ''
          // that.setState({
          //     data:data
          // })
          // that.setState({
          //     gradename:gradename
          // })
          
      }
    } catch (e) {
      // Do something when catch error
    }
  }

  // 搜索按钮
  searchQuestion = ()=>{
    console.log(this.state.data)
    // this.state.questionArr = []
    this.setState({
      questionArr:[]
    })
    this._getList()
    // if(this.state.data.subject==null){
    //   this._tipShow('请选择科目')
    //   return
    // }
    // if(this.state.data.gradename==null){
    //   this._tipShow('请选择年级')
    //   return
    // }
    // if(this.state.data.gradeno==null){
    //   this._tipShow('请选择年级')
    //   return
    // }
    //  wx.navigateTo({
    //       url: `/pages/answer/answer?answerId=${1}&communityId=${2}&contact=${1}&title=${'hahah'}`,
    //       complete:function(e){
    //           // console.log(e)
    //       }
    //   });
  }
  // 选择答题
  _onClickCell = event=>{
    console.log(event)
    console.log(event.currentTarget.id)
    const qid = event.currentTarget.id
    let que = {}
    this.state.questionArr.map((q)=>{
        if(q.id==qid){
          que = q
        }
    })
    wx.setStorageSync('question',JSON.stringify(que))

    
    console.log(que)
    // return
     wx.navigateTo({
        url: `/pages/answerOrder/answerOrder?answerId=${qid}&communityId=${2}&contact=${1}&title=${'hahah'}`,
        complete:function(e){
            // console.log(e)
        }
    });
  }
  // 选择年级
  selectGrade = ()=>{
      wx.navigateTo({
          url: `../../pages/grade/grade`
      });
  }

  _tipShow = (tt)=>{
    wx.vibrateShort()
    wx.showLoading({
      title: tt,
    })
    setTimeout(()=>{
      wx.hideLoading()
    },500)
  }

  gradeChange = event=>{
    // console.log(event.detail.value)
    const data = this.copyObject(this.state.data);
    data.grade = Number(event.detail.value)
    // data.gradeno = ''
    this.stateChange(data)
    // this.setSelectStorage({
    //   grade:(data.gradename-1)*data.gradename*3+data.gradeno,
    //   gradename:data.gradename+1,
    //   gradeno:data.gradeno+1,
    //   subject:data.subject+1,
    // })
    // if(data.gradename==0){
    //   this.props.gradeno = ['一年级','二年级','三年级','四年级','五年级','六年级']
    // }else{
    //   this.props.gradeno = ['一年级','二年级','三年级']
    // }
  }

  subjectChange = event=>{
    const data = this.copyObject(this.state.data);
    data.subject = Number(event.detail.value)
    
    this.stateChange(data)
    // this.setSelectStorage({
    //   gradename:data.gradename+1,
    //   gradeno:data.gradeno+1,
    //   subject:data.subject+1,
    // })
  }

  orderTypeChange = event=>{
    const data = this.copyObject(this.state.data);
    data.orderType = Number(event.detail.value)
    this.stateChange(data)
  }

  stateChange = (data)=>{
    console.log(data)
    console.log(this.setState)
    console.log('------------------------')
    console.log(this.state.data)
    this.setState({
      data: data
    },()=>{
      this.setState({
        data: data
      },()=>{
        console.log('+++++++++++++++++')
        console.log(this.state.data)
      })
      console.log('------------------------')
      console.log(this.state.data)
    })
    
  }

  loadMore = event=>{
    if(this.state.questionArr.length<10){
      this.state.more = false
      return
    }
    if(this.state.more){
      this.state.pageIndex++
      this._getList()
    }

  }

  copyObject = (data)=>{
    const res = {}
    for(let i in data){
      res[i] = data[i]
    }
    return res;
  }

  setSelectStorage = (data) =>{
    try {
        // wx.removeStorageSync('grade')
        wx.setStorage({
          key:"grade",
          data:data,
          complete:()=>{
            // wx.switchTab({
            //     url: `/pages/main/main`,
            //     complete:function(e){
            //         // console.log(e)
            //     }
            // });
          }
        })
      } catch (e) {
        // Do something when catch error
      }
  }
  
  // loadMore = ()=>{
  //   wx.showLoading()
  // }

}

export default Main;

// export default connect(
//   (state)=>({})
// )(Main);