/**
 * Created by wxj on 17/5/1.
 */

import {Component, PropTypes} from 'labrador';

export default class btn extends Component {

    static propTypes = {
        title: PropTypes.string,
        onTap: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            disabled: false
        };
    }

    static defaultProps = {
        confirmText: '确定',
        cancelText: '取消'
    };

    

    /**
     * 弹出
     */

    _onClickCancelBtn = () => {
        this.setState({hidden: true});
    };

    _onTap = event => {
        this.setState({hidden: true});
        this.props.onTap && this.props.onTap(event);
    };
}