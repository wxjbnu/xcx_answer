import wx, {Component, PropTypes} from 'labrador';
import immutable from 'seamless-immutable';
//import { connect } from 'labrador-redux';
import itemList from '../../components/itemList/itemList';
import * as config from '../../config'

const { any } = PropTypes;

class Subject extends Component {
  static propTypes = {
    // foo: any
  };

  static defaultProps = {
    // foo: 'bar'
  };

// [
//         {title:'语文',id:1,url:''},
//         {title:'数学',id:2,url:''},
//         {title:'外语',id:3,url:''},
//         {title:'物理',id:4,url:''},
//         {title:'化学',id:5,url:''},
//         {title:'生物',id:6,url:''},
//         {title:'政治',id:7,url:''},
//         {title:'历史',id:8,url:''},
//         {title:'地理',id:9,url:''},
//       ]
  constructor(props) {
    super(props);
    this.state = immutable({
      name:'',
      userList:config.subjectArr
    });
  }

  children() {
    return {
      listItems: this.state.userList.map((item,index) => {
            return {
                component: itemList,
                key: index+1,
                props: {
                    listObj: {title:item,id:index+1},
                    onClickCell: (e) => { this._onClickCell(e) }
                }
            };
        })
    };
  }

  onLoad = params => {
    const {gId, gName,gnId, gnName} = params;
    this.gId = gId;
    this.gName = gName;
    this.gnId = gnId;
    this.gnName = gnName;
    let name = gName+gnName;

    this.setState({
      name:name
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
  // 选择学科
  _onClickCell = (e)=>{
    console.log('gomain')
    console.log(e)
    const that = this;
    const id = e.currentTarget.id;
    let name = '';
    this.state.userList.map((item,index) => {
        if(id==item.id){
          name = item.title;
        }
    })
    const data = {
        grade:that.gId,
        subject:that.gnId,
        gId:that.gId,
        gName:that.gName,
        gnId:that.gnId,
        gnName:that.gnName,
        sId:id,
        sName:name,
      };
      try {
        // wx.removeStorageSync('grade')
        wx.setStorage({
          key:"grade",
          data:data,
          complete:()=>{
            wx.switchTab({
                url: `/pages/main/main`,
                complete:function(e){
                    // console.log(e)
                }
            });
          }
        })
      } catch (e) {
        // Do something when catch error
      }
    
    
  }
}

export default Subject;

// export default connect(
//   (state)=>({})
// )(Subject);
