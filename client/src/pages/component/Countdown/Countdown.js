import moment from 'moment';
import classNames from 'classnames/bind';

import styles from './Countdown.module.scss';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

function CountDown({end = "2000-27-10 23:59:59", output = 'hour' }) {
   // const beginTime = moment(begin, 'YYYY-MM-DD HH:mm:ss');
    const endTime = moment(end, 'YYYY-MM-DD HH:mm:ss');
    const [countdown , setCountdown] = useState(moment(endTime - moment()));  
    useEffect(()=>{
       const nowTime = moment();
       const interval =  setInterval(()=>{
            setCountdown(moment(endTime - nowTime));
        },2000)

        return ()=>{
            clearInterval(interval);
        }
    },[countdown])

    const hour = countdown.format('HH');
    const minute = countdown.format('mm');
    const second = countdown.format('ss');
    return (
        <div>
            <span className={cx('time-item')}>{hour}</span>:
            <span className={cx('time-item')}>{minute}</span>:
            <span className={cx('time-item')}>{second}</span>
        </div>
    );
}
export default CountDown;
