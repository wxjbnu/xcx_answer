import wx, {Component, PropTypes} from 'labrador';
import immutable from 'seamless-immutable';
//import { connect } from 'labrador-redux';

const { any } = PropTypes;

class picList extends Component {
  static propTypes = {
    host: PropTypes.string,
    local: PropTypes.bool,
    srcArr: PropTypes.array.isRequired
  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = ({
      srcArr:[]
    });
  }

  children() {
    return {};
  }

  onLoad() {
    this.props.host = wx.imgurl
    
    this.initData()
    
  }

  // onReady() {
  // }

  onUpdate() {
    this.initData()
  }

  onShow() {
    this.initData()
  }

  // onHide() {
  // }

  // onUnload() {
  // }

  initData = ()=>{
    var srcArr = []
    console.log(this.props.local)
    if(this.props.local){
      this.props.srcArr.map((e)=>{
        srcArr.push({url:e})
      })
    }else{
      this.props.srcArr.map((e)=>{
        srcArr.push({url:wx.imgurl+e.url})
      })
    }
    this.state.srcArr = srcArr
    console.log(this.props.host,this.props.srcArr)
  }

  preimg = event=>{
      const that = this;
      // console.log(that.state.srcArr[0]);return;
      var url = event.target.id
      var urls = []
      this.props.srcArr.map((e)=>{
        urls.push(wx.imgurl+e.url)
      })
      console.log('start ----------------------')
      console.log(urls)
      console.log(url)
      console.log('end ----------------------')
      wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: urls // 需要预览的图片http链接列表
      })
  }

  preimglocal = event=>{
    var url = event.target.id
    var urls = []
    this.props.srcArr.map((e)=>{
      urls.push(e)
    })
    console.log('start ----------------------')
      console.log(urls)
      console.log(url)
      console.log('end ----------------------')
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  }
}

export default picList;

// export default connect(
//   (state)=>({})
// )(picList);
