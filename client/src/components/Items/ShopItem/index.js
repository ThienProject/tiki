import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from './ShopItem.module.scss'
const cx = classNames.bind(styles);
function ShopItem()
{
    return (
        <div className={cx('shop-item')}>
            <img  className={cx('avatar')} src="https://pdp.edu.vn/wp-content/uploads/2021/06/hinh-anh-suy-tu-1.jpg" alt="avatar"/>
            <div className={cx('info')}>
                <h4 className={cx('shop-name')}> Shop Bakaka</h4>
                <div className={cx('rate')}>
                   <p className={cx('rate-detail')}> <span className={cx('num')}>5.0 </span> </p> 
                    <FontAwesomeIcon  className={cx('icon')} icon ={faStar}/>

                </div>
            </div>
            

        </div>
    )
}
export default ShopItem