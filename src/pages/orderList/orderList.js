import wx, {Component, PropTypes} from 'labrador';
import immutable from 'seamless-immutable';
//import { connect } from 'labrador-redux';

import answerItem from '../../components/answerItem/answerItem';

const { any } = PropTypes;

class OrderList extends Component {
  static propTypes = {
    // foo: any
  };

  static defaultProps = {
    // foo: 'bar'
  };

  constructor(props) {
    super(props);
    this.state = immutable({
      active:['background: #1AAD19;color: #fff;','',''],
      questionArr: [
            {title:'二次函数1',id:1,des:'保持纵横比缩放图片，只保证图片的短边能完全显示出来。',timer:'1493904917083'}
        ],
    });
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
                      onClickCell: this._onClickCell
                  }
              };
          })
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
    selTab = event=>{
      const index = event.target.id.substr(1);
      const arr = [];
      for(let i=0;i<3;i++){
          if(i==index){
              arr[i] = 'background: #1AAD19;color: #fff;'
          }else{
              arr[i] = '';
          }
      }
      
      this.setState({
        active:arr
      })
    } 
    _onClickCell = event => {
        const item = event.currentTarget.dataset;  // 
        wx.navigateTo({
            url: `../../pages/answerOrder/answerOrder?answerId=${1}&communityId=${2}&contact=${1}&title=${'hahah'}`
        });
    };
}

export default OrderList;

// export default connect(
//   (state)=>({})
// )(OrderList);
