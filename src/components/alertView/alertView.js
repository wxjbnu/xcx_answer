/**
 * Created by zhouyumin on 17/1/6.
 */

import {Component, PropTypes} from 'labrador';

export default class AlertView extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        confirmText: PropTypes.string,
        cancelText: PropTypes.string,
        onConfirmTap: PropTypes.func,
    };

    static defaultProps = {
        confirmText: '确定',
        cancelText: '取消'
    };

    state = {
        hidden: true
    };

    /**
     * 弹出
     */
    show = () => {
        this.setState({hidden: false});
    }

    _onClickCancelBtn = () => {
        this.setState({hidden: true});
    };

    _onClickConfirmBtn = () => {
        this.setState({hidden: true});
        this.props.onConfirmTap && this.props.onConfirmTap();
    };
}