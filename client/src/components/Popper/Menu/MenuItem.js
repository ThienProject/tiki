import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Button from '~/components/Button';


const cx = classNames.bind(styles);
function MenuItem({data,onClick}){
    return <Button
    className={cx('menu-item')}
    onClick={onClick}
    leftIcon={data.icon}
    to={data.to}
    href = {data.href}
    >{data.title}</Button>
}
export default MenuItem