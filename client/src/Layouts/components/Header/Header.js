import classNames from 'classnames/bind';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPercent, faSortDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Header.module.scss';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import Search from '../Search';
import Login from '~/components/Auth';
import { logout } from '~/components/Auth/authSlice';
const cx = classNames.bind(styles);

function Header() {
    const MENU_ITEMS = [
        {
            title: 'Đơn hàng của tôi',
            to: '/order',
        },
        {
            title: 'Thông báo của tôi',
            to: '/notification',
        },
        {
            title: 'Mã giảm giá',
            to: '/discount',
            icon: <FontAwesomeIcon icon={faPercent} />,
        },
        {
            title: 'Logout',
            to: '/',
            onClick: () => {
                const action = logout();
                dispatch(action);
            },
        },
    ];
    const contentFormRef = useRef();
    const loginFormRef = useRef();
    const dispatch = useDispatch();
    const handleClickOutLogin = (e) => {
        if (!contentFormRef.current.contains(e.target)) {
            loginFormRef.current.classList.toggle(cx('account--login'));
        }
    };
    const state = useSelector((state) => state.auth);
    const user = state.user;
    const isLogin = Boolean(user);
    return (
        <header className={'row ' + cx('header')}>
            <a href="/" className={'col c-12  c-o-6 m-0 l-1 l-o-0 ' + cx('logo')}>
                <Image src={'error'} alt="tiki" />
            </a>
            <div className={'col c-12 m-12 l-11 ' + cx('header-right')}>
                <div className={cx('header-right','row ')}>
                    <Search className={'l-9 m-9 c-10'} />
                    <div className={cx('actions','l-3 m-3 c-2')}>
                        {isLogin ? (
                            <div>
                                 <Menu items={MENU_ITEMS}>
                                    <div className={cx('account')}>
                                        <FontAwesomeIcon className={cx('account-icon')} icon={faUser} />
                                        <span className={cx('name')}>
                                            {user.fullname}
                                            <FontAwesomeIcon className={cx('sort-down')} icon={faSortDown} />
                                        </span>
                                    </div>
                                </Menu>
                            </div>
                        ) : (
                            <div className={cx('account')} ref={loginFormRef} onClick={handleClickOutLogin}>
                                <FontAwesomeIcon className={cx('account-icon')} icon={faUser} />
                                <span className={cx('name')}>Login / Register </span>
                                <FontAwesomeIcon className={cx('sort-down')} icon={faSortDown} />
                                <Login
                                    contentFormRef={contentFormRef}
                                    loginFormRef={loginFormRef}
                                    classModifier={cx('account--login')}
                                    className={cx('login-form')}
                                />
                            </div>
                        )}
                        <div className={cx('cart')}>
                            <FontAwesomeIcon className={cx('cart-icon')} icon={faCartShopping} />
                            <span className={cx('cart-name')}> Cart</span>
                            <span className={cx('quantity')}>3</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
export default Header;
