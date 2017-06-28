import wx, {Component, PropTypes} from 'labrador';
import immutable from 'seamless-immutable';
//import { connect } from 'labrador-redux';

const { any } = PropTypes;

class voiceList extends Component {
  static propTypes = {
    voiceArr: PropTypes.array.isRequired
  };

  static defaultProps = {
    foo: 'bar'
  };

  constructor(props) {
    super(props);
    this.state = immutable({
        voiceTime : 33
    });
    // this.voiceTime = 33;
  }

  children() {
    return {};
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
    playVoice = event =>{
        let voicesrc = event.currentTarget.id;
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
}

export default voiceList;

// export default connect(
//   (state)=>({})
// )(voiceList);
