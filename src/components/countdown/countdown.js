/**
 * Created by zhouyumin on 17/1/6.
 */

import {Component, PropTypes} from 'labrador';
import * as config from '../../config'

export default class countdown extends Component {

    static propTypes = {
        ltimer: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            hour: '00',
            min: '00',
            sec: '00'
        };
    }
    onReady(){
        if(!config.debug){
            this.settime = setInterval(()=>{
                this._changeTime(this._calculateTime())
            },1000)
        }
    }

    // 计算剩余时间
    _calculateTime(){
        const that = this;
        let nowtime = new Date();
        nowtime = nowtime.getTime();
        
        let lasttime = 0;
        // console.log(this.props.ltimer,nowtime)
        if(this.props.ltimer>nowtime){
            lasttime = this.props.ltimer - nowtime;
        }else{
            clearInterval(that.settime)
        }
        return lasttime;
    }
    // 转换为时分秒,timer为秒
    _changeTime(timer){
        timer = parseInt(timer/1000);
        let hour = parseInt(timer/3600);
        let min = parseInt(timer/60)%60;
        let sec = timer%60;
        hour = hour>9?hour:'0'+hour;
        min = min>9?min:'0'+min;
        sec = sec>9?sec:'0'+sec;
        this.setState({
            hour: String(hour),
            min: String(min),
            sec: String(sec)    
        });
    }
}