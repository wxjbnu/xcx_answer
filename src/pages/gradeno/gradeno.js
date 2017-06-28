import wx, {Component, PropTypes} from 'labrador';
import immutable from 'seamless-immutable';
//import { connect } from 'labrador-redux';
import itemList from '../../components/itemList/itemList';

const { any } = PropTypes;

class Gradeno extends Component {
  static propTypes = {
    // gId: PropTypes.string,
    // gName: PropTypes.string,
  };

  static defaultProps = {
    // foo: 'bar'
  };

  constructor(props) {
    super(props);
    this.state = immutable({
      name:'小学',
      userList:[      //

      ],
      list:[
        {title:'一年级',id:1},
        {title:'二年级',id:2},
        {title:'三年级',id:3},
        {title:'四年级',id:4},
        {title:'五年级',id:5},
        {title:'六年级',id:6},
      ]
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

  onLoad = params =>  {
    const {gId, gName} = params;
    this.gId = gId;
    this.gName = gName;
    let parm = [];
    
    if(this.gName=="小学"){
        this.state.list.map((i)=>{
          parm.push(i);
        })
    }else{
      for(let i =0;i<3;i++){
        parm.push(this.state.list[i]);
      }
    }
    this.setState({userList:parm})
    this.setState({name:gName})
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

  _onClickCell = (e)=>{
    const that = this;
    const id = e.currentTarget.id;
    let name = '';
    this.state.userList.map((item,index) => {
        if(id==item.id){
          name = item.title;
        }
    })
    wx.navigateTo({
        url: `/pages/subject/subject?gId=${that.gId}&gName=${that.gName}&gnId=${id}&gnName=${name}`,
        complete:function(e){
            // console.log(e)
        }
    });
  }

}

export default Gradeno;

// export default connect(
//   (state)=>({})
// )(Gradeno);
