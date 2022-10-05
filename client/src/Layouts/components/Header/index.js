import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faPercent, faSortDown, faUser } from '@fortawesome/free-solid-svg-icons'


import images from '~/assets/images'
import styles from './Header.module.scss'
import Menu from '~/components/Popper/Menu'
import Image from '~/components/Image'
import Search from '../Search'
import Login from '~/components/Login'
const cx = classNames.bind(styles)

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
        icon: <FontAwesomeIcon icon={faPercent} />
    },
]


function Header() {
    const contentFormRef = useRef();
    const loginFormRef = useRef();
    const handleClickOutLogin = (e) => {
        if (!(contentFormRef.current.contains(e.target))) {
            loginFormRef.current.classList.toggle(cx('account--login'));
        }
    }
    
    const userLogin = false;

    return <header className={cx('header')}>
        <a href='/' className={cx('logo')}>
            <Image src={"error"} alt='tiki' />
        </a>
        <div className={cx('header-right')}>
            <Search />
            <div className={cx('actions')}>
                {
                    userLogin ?
                        <Menu
                            items={userLogin ? MENU_ITEMS : ''}
                        >
                            <div className={cx('account')}>
                                <FontAwesomeIcon className={cx('account-icon')} icon={faUser} />
                                <span className={cx('name')}>Phạm Văn Thiên
                                    <FontAwesomeIcon className={cx('sort-down')} icon={faSortDown} />
                                </span>
                            </div>
                        </Menu>
                        :
                        <div className={cx('account')}
                            ref = {loginFormRef}
                            onClick = {handleClickOutLogin}
                        >
                            <FontAwesomeIcon className={cx('account-icon')} icon={faUser} />
                            <span className={cx('name')}>Login / Register </span>
                            <FontAwesomeIcon className={cx('sort-down')} icon={faSortDown} />
                            <Login contentFormRef={contentFormRef} loginFormRef = {loginFormRef} classModifier= {cx('account--login')} className={cx('login-form')} />
                        </div>

                }




                <div className={cx('cart')}>
                    <FontAwesomeIcon className={cx('cart-icon')} icon={faCartShopping} />
                    <span> Cart</span>
                    <span className={cx('quantity')} >3</span>
                </div>
            </div>
        </div>

    </header>
}
export default Header