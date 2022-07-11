import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import images from '~/assets/images';
import Image from '~/components/Image';
import styles from './Suggestion.module.scss';
import * as productService from '~/apiServices/productService';
import ProductItem from '../Item/ProductItem';
const cx = classNames.bind(styles);
function Suggestion() {
    const [productForYou, setProductForYou] = useState([]);
    const [market, setMarket] = useState([]);
    const [currentTab, setCurrentTab] = useState('productForYou');
    const tabs = useRef();
    /*   const [currentOffset, setCurrentOffset] = useState(0); */

    console.log('render');
    /* console.log(productForYou[0].name); */
   /*  const hah = productForYou[0] ;
    console.log(hah.images) */

    useEffect(() => {
        console.log('effect 1');      
        fetchApi(currentTab);     
    }, [currentTab]);

    const fetchApi = async (tab) => {
        const page_size = 3;
        const offset = productForYou.length ;
        /*  setCurrentOffset(productForYou.length - 1); */
        const result = await productService.getProductLimit(offset, page_size);
        if (result) {
            console.log('api 1');
            setProductForYou((prev) =>{
                if(JSON.stringify(prev)  !== (JSON.stringify(result))){
                    return [...prev, ...result]
                }
                else {
                    return prev
                }
            });
        }
    };
    function handleViewMore(){
        fetchApi();
    } 

    function handleClickOptionForYou(e){
        console.log('lll')
        setCurrentTab('productForYou');
        tabs.current.childNodes.forEach(tab => {
            tab.classList.remove(cx('active'));
        });
        e.currentTarget.classList.add(cx('active'));
    }
    function handleClickOptionMark(e){
        setCurrentTab('productMark');
        tabs.current.childNodes.forEach(tab => {
            tab.classList.remove(cx('active'));
        });
        e.currentTarget.classList.add(cx('active'));
    }
    return (
        <div className={cx('today-suggestions')}>
            <div className={cx('title-row', 'suggestions-header')}>
                <h2 className={cx('title-content')}>Today's Suggestions</h2>
                <div ref = {tabs} className={cx('suggestions-option__list')}>
                    <div className={cx('suggestions-option__item' ,{
                            active : true
                        })}
                        onClick = {
                            handleClickOptionForYou
                        }
                        >
                        <Image src={images.forYou} className={cx('suggestions-option__item-icon' )} />
                        <p className={cx('suggestions-option__item-name')}>For you</p>
                    </div>
                    <div className={cx('suggestions-option__item')}
                         onClick = {
                            handleClickOptionMark
                        }
                    >
                        <Image src={images.mark} className={cx('suggestions-option__item-icon')} />
                        <p className={cx('suggestions-option__item-name')}>Go to market</p>
                    </div>
                </div>
            </div>
            <div className={'row ' + cx('suggestions-content')}>
                    {productForYou.map((product, index) => {
                        return <ProductItem className = {cx('suggestions-content__item')} key={index} product={product} ></ProductItem>;
                    })}
            </div>
            <div 
             onClick={handleViewMore}
             className = {cx('view-more')}>
                <p>View more</p>
            </div>
        </div>
    );
}
export default Suggestion;
