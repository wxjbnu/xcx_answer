import wx, {Component, PropTypes} from 'labrador';
import immutable from 'seamless-immutable';
//import { connect } from 'labrador-redux';

import answerDes from '../../components/answerDes/answerDes';

import picList from '../../components/picList/picList';
import voiceList from '../../components/voiceList/voiceList';
import {upload} from '../../utils/upload';
import * as config from '../../config'

const { any } = PropTypes;

class AnswerDetail extends Component {
  static propTypes = {
    // answer: PropTypes.object,
  };

  static defaultProps = {
    gradeArr: config.gradeArr,
    subjectArr: config.subjectArr,
  };

  constructor(props) {
    super(props);
    this.state = ({
        questionId:null,
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
        userinfo:{
            poster:'http://wx.qlogo.cn/mmopen/vi_32/WO7FYhun0eNpKYgF0M26sTSRUWV1L4UINwg6ibYMia5Bm80xkDic3xWpGvNCuln0H93ecd46JS0PzCg6Anpl1xtXg/0',
        },
        imgArr:[],//图片上传数组
        srcArr:[],//图片展示数组
        voiceArr:[],
        content:'',
        // 暂时没用到
        answer:{
            title:'11',
            content:'',
            srcArr:[],
            voiceArr:[],
        }
    });
  }
  children() {
    const item = this.state.answer || {};
    const srcArr = this.state.question.image_url || [];
    const voiceArr = this.state.question.voice_url || [];
    return {
          // answerDes: {
          //     component: answerDes,
          //     props: {
          //         answerDes: item,
          //         // onClickCell: this._onClickCell
          //     }
          // },
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
         
    };
  }

  onLoad = param => {
      console.log(param)
      this.state.questionId = param.topicId
      this.state.question = (wx.getStorageSync('question'))
      console.log(this.state.question)
      this.setState({
        questionId:param.topicId
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
    // 录音
    startrecordvioce = event =>{
        const that = this;
        that.shake = true;
        that.shaketime = setTimeout(()=>{
            that.shake = false;
            wx.startRecord({
                success:function(e){
                    console.log('success',e)
                },
                fail:function(e){
                    console.log('error',e)
                },
                complete:function(e){
                    var tempFilePath = e.tempFilePath
                    // wx.showModal({
                    //     title:'录音',
                    //     content:JSON.stringify(e)
                    // })
                    // that.state.srcArr.push(tempFilePaths)
                    if(e.errMsg.indexOf('ok')>-1){
                        that.setState({
                            voiceArr:[...that.state.voiceArr, tempFilePath]
                        })
                    }
                    
                    console.log('complete',e)
                }
            })
        },200);
        
    }
    // 录音结束
    stoprecordvioce = event =>{
        const that = this;
        if(that.shake){
            clearTimeout(that.shaketime)
            wx.showToast({
                title: '录音时间太短',
                icon: 'loading',
                duration: 500
            });
            return;
        }
        wx.stopRecord()
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

    answerQuestion = event =>{
        const url = `${wx.host}zerg/public/api/v1/createanswer`;
        const data = {
            topicId:this.state.question.tid,
            title:'11',
            content:this.state.content,
            imageurl:this.state.imgArr.join(),
            userid:22,
        }
        const token = wx.getStorageSync('token').token
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
                            wx.navigateTo({
                                url: `../../pages/answerInfo/answerInfo?topicId=${data.topicId}&title=${'hahah'}`
                            });
                        }
                    });
                }
                console.log('complete',r)
            }
        })
    }

}

export default AnswerDetail;

// export default connect(
//   (state)=>({})
// )(AnswerDetail);
