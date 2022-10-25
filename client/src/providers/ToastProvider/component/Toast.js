import style from './Toast.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

function Toast({children}) {
    return (
    <div className ={cx('wrapper', {active : true})}>
        {children}
    </div>
    )
}
export default Toast;