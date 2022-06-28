import classNames from "classnames/bind";
import styles from './Contact.module.scss';

function Contact()
{
    const cx = classNames.bind(styles);
    return  <div className={cx('contact')}>

    </div>
}
export default Contact