/**
 * Created by wxj on 17/4/29.
 */

import wx, {Component, PropTypes} from 'labrador';
import immutable from 'seamless-immutable';
import countdown from '../countdown/countdown';
import * as config from '../../config'

class answerItem extends Component {
    static propTypes = {
        host:PropTypes.string,
        answerModel:PropTypes.object.isRequired,
        isAnswer:PropTypes.bool,
        onClickCell:PropTypes.func,
    };

    constructor(props) {
        super(props);

        // 将科目和年级转换为汉字
        this.state = {
            grade: config.gradeArr[props.answerModel.grade],
            subject: config.subjectArr[props.answerModel.subject],
        };
        // let grade = this.props.answerModel.grade
        // this.state.grade = 
    }

    children() {
        // const items = this.state.questionList || [];
        return {
            // 倒计时组件
            countdown:{
                component: countdown,
                props: {
                    ltimer:this.props.answerModel.timer
                }
            },
        };
    }

    onLoad() {
        this.props.host = wx.imgurl
        
        console.log(this.props.answerModel.image_url)
        console.log(this.props.host)
    }

    // onReady() {
    // }

    onUpdate() {
    }

    onShow() {
    }

    // onHide() {
    // }

    // onUnload() {
    // }

    _onClickCell = event => {
        // this.setState({hidden: true});
        // console.log('children 111111111111111111111111')
        this.props.onClickCell && this.props.onClickCell(event);
        // wx.navigateTo({
        //     url: `../../pages/answer/answer?answerId=${1}&communityId=${2}&contact=${1}&title=${'hahah'}`
        // });
    };

}

export default answerItem;