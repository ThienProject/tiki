import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from './PopularSearchItem.module.scss'
const cx = classNames.bind(styles);
function PopularSearchItem({className})
{
    return (
        <div className={cx('shop-item', className)}>
            <img  className={cx('avatar')} src="https://pdp.edu.vn/wp-content/uploads/2021/06/hinh-anh-suy-tu-1.jpg" alt="avatar"/>
            <div className={cx('info')}>
                <h5 className={cx('shop-name')}> Shop Bakaka</h5>
            </div>
            

        </div>
    )
}
export default PopularSearchItem