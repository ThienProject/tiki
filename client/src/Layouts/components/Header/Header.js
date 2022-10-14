import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faPercent, faSortDown, faUser } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'


import images from '~/assets/images'
import styles from './Header.module.scss'
import Menu from '~/components/Popper/Menu'
import Image from '~/components/Image'
import Search from '../Search'
import Login from '~/components/Auth'
import { logout } from '~/components/Auth/authSlice'
import { Button } from '@mui/material'
import * as usersService from '~/apiServices/usersService'
const cx = classNames.bind(styles)

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
            icon: <FontAwesomeIcon icon={faPercent} />
        },
        {
            title: 'Logout',
            to: '/',
            onClick : ()=>{
                const action = logout();
                dispatch(action)
            }
        },
    ]
    const contentFormRef = useRef();
    const loginFormRef = useRef();
    const dispatch = useDispatch();
    const handleClickOutLogin = (e) => {
        if (!(contentFormRef.current.contains(e.target))) {
            loginFormRef.current.classList.toggle(cx('account--login'));
        }
    }
    const state = useSelector(state  => state.auth);
    // console.log(state);
    const user = state.user;
    const isLogin = Boolean(user);
    return <header className={cx('header')}>
        {/* test btn */}
        <Button onClick={async ()=>{
            const profile = await usersService.profile(23,'thien');
            console.log(profile)
            
        }}>click me </Button>

        <a href='/' className={cx('logo')}>
            <Image src={"error"} alt='tiki' />
        </a>
        <div className={cx('header-right')}>
            <Search />
            <div className={cx('actions')}>
                {
                    isLogin ?
                    <div>
                           <Menu
                            items={MENU_ITEMS}
                        >
                            <div className={cx('account')}>
                                <FontAwesomeIcon className={cx('account-icon')} icon={faUser} />
                                <span className={cx('name')}>{user.user_name}
                                    <FontAwesomeIcon className={cx('sort-down')} icon={faSortDown} />
                                </span>
                            </div>
                        </Menu>
                    </div>
                     
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