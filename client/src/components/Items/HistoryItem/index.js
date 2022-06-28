import classNames from "classnames/bind";
import styles from './HistoryItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft, faTimes } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function HistoryItem()
{
    return (
        <div className={cx('search-item')}>
            <div className={cx('search-detail')}>
                <FontAwesomeIcon className={cx('icon')} icon = {faClockRotateLeft} />
                <p className={cx('content')}>Washing Machine</p>
            </div>
            <button className={cx('delete-search')}>
                <FontAwesomeIcon icon = {faTimes}/>
            </button>
        </div>

    )
}
export default HistoryItem