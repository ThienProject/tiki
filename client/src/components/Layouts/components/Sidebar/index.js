import classNames from "classnames/bind";
import styles from './Sidebar.module.scss'

function SideBar()
{
    const cx = classNames.bind(styles)
    return  <div className={cx('sidebar')}>
                <h1> SideBar </h1>
            </div>
}
export default SideBar