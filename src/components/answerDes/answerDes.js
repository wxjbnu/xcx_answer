import wx, {Component, PropTypes} from 'labrador';
import immutable from 'seamless-immutable';
//import { connect } from 'labrador-redux';

import picList from '../picList/picList';
import voiceList from '../voiceList/voiceList';

const { any } = PropTypes;

class answerDes extends Component {
  static propTypes = {
    answerDes: PropTypes.object.isRequired,
  };

  static defaultProps = {
    // foo: 'bar'
  };

  constructor(props) {
    super(props);
    this.state = immutable({
      // srcArr:props.answerDes.srcArr,
      // voiceList:props.answerDes.voiceList,
    });
  }

  children() {
    const srcArr = this.props.answerDes.srcArr||[];
    const voiceList = this.props.answerDes.voiceList||[];

    return {
        picList:{
            component: picList,
            props: {
                srcArr: srcArr,
            }
        },
        voiceList:{
            component: voiceList,
            props: {
                voiceArr: voiceList,
            }
        },
    };
  }

  // onLoad() {
  // }

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

    preimg = event=>{
      const that = this;
      console.log(event.currentTarget.id)
      // console.log(that.state.srcArr[0]);return;
      wx.previewImage({
          // current: '', // 当前显示图片的http链接
          urls: [event.currentTarget.id] // 需要预览的图片http链接列表
      })
    }

}

export default answerDes;

// export default connect(
//   (state)=>({})
// )(answerDes);
