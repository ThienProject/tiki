
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';

import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import {default as PopperWrapper} from '~/components/Popper'
const cx = classNames.bind(styles);

function Menu({children, items =[]}){
    const [history, setHistory] = useState([{data : items}])
    const currentMenu = history[history.length -1];

    function renderItem(){
        return  currentMenu.data.map((item, index)=>{
            return <MenuItem key={index}  data = {item}></MenuItem>
        })
           
    }
    return (

        <Tippy
            placement='bottom'
            interactive = {true}
            render = {(attrs) => (
                <div className = {cx('menu-account')}>
                   <PopperWrapper>
                     {renderItem()}
                   </PopperWrapper>
                </div>
            ) }
        
        
        >

        {children}
        </Tippy>
    )
}   
export default Menu