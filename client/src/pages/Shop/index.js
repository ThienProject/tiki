import classNames from "classnames/bind";
import styles from './Shop.module.scss';

function Shop()
{
    const cx = classNames.bind(styles);
    return  <div className={cx('Shop')}>

    </div>
}
export default Shop