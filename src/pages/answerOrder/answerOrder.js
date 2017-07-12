import wx, {Component, PropTypes} from 'labrador';
import {log, POST, showHUDMessage, showHUDLoading, hideHUDLoading} from '../../utils/utils';
import URL from '../../utils/url-interface';
import immutable from 'seamless-immutable';
//import { connect } from 'labrador-redux';

import answerItem from '../../components/answerItem/answerItem';

import picList from '../../components/picList/picList';
import voiceList from '../../components/voiceList/voiceList';
// const { any } = PropTypes;

class Main extends Component {

  static propTypes = {
    grade: PropTypes.array
  };

  // static defaultProps = {
  //   grade: ['小学','初中','高中']
  // };

  constructor(props) {
    super(props);
    this.state = ({
        topicId:null,
        question:{
          title:'哈哈',
          id:1,
          des:'asd',
          grade:'2',
          subject:'2',
          stop_time:'2017-05-20 00:00:00',
          price:22,
          image_url:[],
          voice_url:[],
          timer:1493904917083
        },
        data:{
          grade:'1',
        }
    });
  }

  children() {
    const item = this.state.question || {};
      return {
          answerItem: {
              component: answerItem,
              props: {
                  answerModel: item,
                  isAnswer:true,
                  onClickCell: this._onClickCell
              }
          },
          // 问题描述组件
          // listItems: items.map((item) => {
          //     return {
          //         component: answerItem,
          //         key: item.id,
          //         props: {
          //             answerModel: item,
          //             onClickCell: this._onClickCell
          //         }
          //     };
          // })
      };
  }
  onPullDownRefresh = ()=>{
    wx.stopPullDownRefresh()
  }
  onLoad = param => {
      console.log(param)
      this.state.topicId = param.topicId
      this.state.question = (wx.getStorageSync('question'))
      console.log(this.state.question)
      this.setState({
        topicId:param.topicId
      })
  }

  // onReady() {
  // }

  // onUpdate() {
  // }

  // onShow() {
  // }

  // onHide() {
  // }

  // onUnload() {
  // }

  answerQuestion = event=>{
    const url = `${wx.host}zerg/public/api/v1/rushtopic`;
    const data = {
        topic_id:this.state.question.tid,
    }
    const token = wx.getStorageSync('token').token
    const topicId = this.state.topicId
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
          console.log('complete',r)
          if(r.errMsg.indexOf('ok')>-1){
            wx.navigateTo({
              url: `../../pages/answerDetail/answerDetail?topicId=${topicId}&title=${'hahah'}`
            });
          }else{
            wx.showToast({
              title: JSON.stringify(r),
              duration: 3000
            });
          }
        }
    })    
  }

  gradeChange = event=>{
    this.setState({
      data: {
        grade:event.detail.value
      }
    })
  }

}

export default Main;

// export default connect(
//   (state)=>({})
// )(Main);
