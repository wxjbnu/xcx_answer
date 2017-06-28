import wx, {Component, PropTypes} from 'labrador';
import immutable from 'seamless-immutable';
//import { connect } from 'labrador-redux';
import itemList from '../../components/itemList/itemList';

const { any } = PropTypes;

class Grade extends Component {
  static propTypes = {
    foo: any
  };

  static defaultProps = {
    foo: 'bar'
  };

  constructor(props) {
    super(props);
    this.state = immutable({
        tips: 'opo',           // 社区的提示语
        userInfo: {},     // [VenueModel]
        userList:[      //
            {title:'小学',id:1,url:''},
            {title:'初中',id:2,url:''},
            {title:'高中',id:3,url:''},
            
        ]    // [VenueModel]
    });
  }

  children() {
    return {
      listItems: this.state.userList.map((item,index) => {
            return {
                component: itemList,
                key: item.id,
                props: {
                    listObj: item,
                    onClickCell: (e) => { this._onClickCell(e) }
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
  _onClickCell = (e)=>{
    const id = e.currentTarget.id;
    let name = '';
    this.state.userList.map((item,index) => {
        if(id==item.id){
          name = item.title;
        }
    })
    wx.navigateTo({
        url: `/pages/gradeno/gradeno?gId=${id}&gName=${name}&contact=${1}&title=${'hahah'}`,
        complete:function(e){
            // console.log(e)
        }
    });
  }
}

export default Grade;

// export default connect(
//   (state)=>({})
// )(Grade);
