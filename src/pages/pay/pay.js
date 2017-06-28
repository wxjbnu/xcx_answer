import wx, {Component, PropTypes} from 'labrador';
import immutable from 'seamless-immutable';
//import { connect } from 'labrador-redux';

const { any } = PropTypes;

class Pay extends Component {
  static propTypes = {
    // foo: any
  };

  static defaultProps = {
    // foo: 'bar'
  };

  constructor(props) {
    super(props);
    this.state = immutable({
      iconSize:60,
      iconType:'info',
    });
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

  pay = e=>{
    
  }
}

export default Pay;

// export default connect(
//   (state)=>({})
// )(Pay);
