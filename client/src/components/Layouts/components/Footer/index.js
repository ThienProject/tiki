import classNames from "classnames/bind";
import styles from './Footer.module.scss';
function Footer()
{
    const cx = classNames.bind(styles);
    return (
        <footer className={cx('footer')} >
            <h1>Footer</h1> 
        </footer>
        )
}
export default Footer