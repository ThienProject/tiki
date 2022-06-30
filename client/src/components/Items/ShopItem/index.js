import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from './ShopItem.module.scss'
import Image from "~/components/Image";
const cx = classNames.bind(styles);
function ShopItem({item, ...props})
{
    return (
        <div className={cx('shop-item')}>
            <Image className={cx('avatar')} src= {`http://localhost:3001/images/users/${item.avatar}` }alt="avatar"/>
            <div className={cx('info')}>
                <h4 className={cx('shop-name')}>{item.shop_name}</h4>
                <div className={cx('rate')}>
                   <p className={cx('rate-detail')}> <span className={cx('num')}>5.0 </span> </p> 
                    <FontAwesomeIcon  className={cx('icon')} icon ={faStar}/>
                </div>
            </div>
        </div>
    )
}
export default ShopItem