import classNames from 'classnames/bind'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping,faPercent,faSortDown,faUser} from '@fortawesome/free-solid-svg-icons'


import images from '~/assets/images'
import styles from './Header.module.scss'
import Menu from '~/components/Popper/Menu'
import Image from '~/components/Image'
import Search from '../Search'
const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        title: 'Đơn hàng của tôi',
        to : '/order',
    },
    {
        title: 'Thông báo của tôi',
        to : '/notification',
    },
    {
        title: 'Mã giảm giá',
        to : '/discount',
        icon : <FontAwesomeIcon icon={faPercent} />
    },
]
function Header()
{ 
    const userLogin = true;
    return  <header className={cx('header')}>
                <a href='/' className={cx('logo')}>
                     <Image src={"errokkk"} alt='tiki' /> 
                </a>
                <div className={cx('header-right')}>
                    <Search />
                    <div className={cx('actions')}>
                        
                        <Menu
                        items = {userLogin ? MENU_ITEMS : ''}
                        > 
                            <div className={cx('account')}>
                                <FontAwesomeIcon className={cx('account-icon')} icon ={faUser} />
                                <span className={cx('name')}>Phạm Văn Thiên
                                <FontAwesomeIcon className={cx('sort-down')} icon = {faSortDown}/>
                                </span>
                            </div>
                        </Menu>
                        


                        <div className={cx('cart')}>
                            <FontAwesomeIcon className={cx('cart-icon')} icon ={faCartShopping} />
                            <span> Cart</span>
                            <span className={cx('quantity')} >3</span>
                        </div>
                    </div>
                </div>
                
            </header>
}
export default Header