
import {Component, PropTypes} from 'labrador';
import {log, POST} from '../../utils/utils';

export default class DateSegment extends Component {

    static propTypes = {
        onClickDate: PropTypes.func.isRequired,
        dates: PropTypes.array.isRequired           // ["2017-01-05", "2017-01-06", ...]
    };

    constructor(props) {
        super(props);

        this.state = {
            dateModels: [],
            selectIndex: '0'
        };
    }

    onClickDate = event => {
        const selectIndex = event.currentTarget.id;
        if (selectIndex.length > 0) {
            this.setState({selectIndex});

            const index = parseInt(selectIndex);
            const selectDate = this.state.dateModels[index].fullDate;
            this.props.onClickDate && this.props.onClickDate(selectDate);
        }
    };

    /**
     * ********************
     * 收到新的props更新state
     * ********************
     */
    onUpdate(props) {
        const dateModels = this._formatDateModels(props.dates);
        this.setState({dateModels});
    }

    /**
     * 处理日期数据
     * @returns dateModels [{title: '星期一', date: '12-31', fullDate: '2016-12-31'}, ...]
     */
    _formatDateModels = dates => {
        const today = (new Date()).format("yyyy-MM-dd");

        return dates.map((e, i) => {
            const isToday = e === today;
            const subDate = e.substr(5, 5);

            let week = '今天';
            if (!isToday) {
                week = this._getWeek(e);
            }
            return {title: week, date: subDate, fullDate: e}
        })
    }

    /**
     * 字符串日期转星期
     */
    _getWeek = fullDate => { // '2016-12-31'
        const temp = fullDate.split("-");
        const year = parseInt(temp[0]);
        const month = parseInt(temp[1]) - 1;
        const day = parseInt(temp[2]);
        const date = new Date(year, month, day, 0, 0, 0);

        const week = date.getDay();
        switch (week) {
            case 0:
                return '星期日';

            case 1:
                return '星期一';

            case 2:
                return '星期二';

            case 3:
                return '星期三';

            case 4:
                return '星期四';

            case 5:
                return '星期五';

            case 6:
                return '星期六';
        }
    }
}
