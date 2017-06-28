/**
 * Created by wxj on 17/4/29.
 */

import {Component, PropTypes} from 'labrador';
// import countdown from '../countdown/countdown';

export default class itemList extends Component {

    static propTypes = {
        listObj:PropTypes.object.isRequired,
        onClickCell:PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            hour: '00',
            min: '00',
            sec: '00'
        };
    }

    onLoad = ()=>{
        console.log(this.props)
    }

    _onClickCell = event => {
        // this.setState({hidden: true});
        this.props.onClickCell && this.props.onClickCell(event);
    };

}