
/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import images from '~/assets/images';
import Image from '~/components/Image';
import styles from './Suggestion.module.scss';
import * as productService from '~/apiServices/productService';
import ProductItem from '../ProductItem';
const cx = classNames.bind(styles);
function    Suggestion() {
    const [products, setProducts] = useState([]);
    const [market, setMarket] = useState([]);
    const [currentTab, setCurrentTab] = useState('products');
    const [viewMore, setViewMore] = useState({productsTab : true, marketTab : true})
    const tabs = useRef();
    const viewMoreRef = useRef();

    /*   const [currentOffset, setCurrentOffset] = useState(0); */

    console.log('render suggestion');
    console.log(viewMore);
    useEffect(()=>{
        switch (currentTab) {
            case 'products' :       
                    console.log(viewMore.productsTab);
                    if(viewMore.productsTab){
                        console.log("có");
                        viewMoreRef.current.classList.add(cx('active'));
                    }
                    else {
                        viewMoreRef.current.classList.remove(cx('active'));
                    }
                 
                break;
            case 'market' :
                    if(viewMore.marketTab){
                        viewMoreRef.current.classList.add(cx('active'));
                    }
                    else {
                        viewMoreRef.current.classList.remove(cx('active'));
                    }
                    
                break;      
            default:
                break;
        }
    },[currentTab,viewMore])

    useEffect(() => {
      const handleCurrentTabChange =  async ()=>{
        if(products.length <= 0 || market.length <= 0){
              fetchApi();
        }
        }
    handleCurrentTabChange();    
    }, [currentTab]);

    const fetchApi = async () => {
            const page_size = 3;
            const offset = currentTab === 'products' ? products.length : market.length;
            const result = await productService.getProductLimit(offset, page_size, currentTab);
            if (result) {
                console.log(result.length)
                if(result.length < page_size){
                    if(currentTab === 'products'){
                        setViewMore({...viewMore, productsTab : false});
                    }
                    else{
                        setViewMore({...viewMore, marketTab : false});
                    }
                }
                
                if(currentTab === 'products'){
                    setProducts([...products, ...result]);
                }
                else{
                    setMarket([...market, ...result]);
                }
             
            }    
    };

    function handleViewMore(){
        fetchApi();
    } 

    function handleClickOptionForYou(e){
        setCurrentTab('products');
        tabs.current.childNodes.forEach(tab => {
            tab.classList.remove(cx('active'));
        });
        e.currentTarget.classList.add(cx('active'));
    }
    function handleClickOptionMark(e){
        setCurrentTab('market');
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
                    {(currentTab === 'products' ? products : market).map((product, index) => {
                        return <ProductItem className = {cx('suggestions-content__item')} key={index} product={product} ></ProductItem>;
                    })}
            </div>
            <div 
             ref = {viewMoreRef}
             onClick={handleViewMore}
             className = {cx('view-more', 'active')}>
                <p>View more</p>
            </div>
        </div>
    );
}
export default Suggestion;
