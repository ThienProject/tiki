import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import images from '~/assets/images';
import Image from '~/components/Image';
import styles from './Suggestion.module.scss';
import * as productService from '~/apiServices/productService';
import ProductItem from '../Item/ProductItem';
const cx = classNames.bind(styles);
function Suggestion() {
    const [productForYou, setProductForYou] = useState([]);
    /*   const [currentOffset, setCurrentOffset] = useState(0); */

    console.log('render');
    /* console.log(productForYou[0].name); */
   /*  const hah = productForYou[0] ;
    console.log(hah.images) */

    useEffect(() => {
        console.log('effect 1');
        const fetchApi = async () => {
            const page_size = 36;
            const offset = productForYou.length ;
            /*  setCurrentOffset(productForYou.length - 1); */
            const result = await productService.getProductLimit(offset, page_size);
            if (result) {
                console.log('api 1');
                setProductForYou((prev) =>{
                    if(prev.length != (result.length)){
                        return [...prev, ...result]
                    }
                    else {
                        return prev
                    }
                });
            }
        };
        fetchApi();

       
    }, []);

    /*   function handleViewMore(){
        getProductForYou();
    } */

    return (
        <div className={cx('today-suggestions')}>
            <div className={cx('title-row', 'suggestions-header')}>
                <h2 className={cx('title-content')}>Today's Suggestions</h2>
                <div className={cx('suggestions-list-option')}>
                    <div className={cx('suggestions-item')}>
                        <Image src={images.forYou} className={cx('suggestions-item__icon')} />
                        <p className={cx('suggestions-item__name')}>For you</p>
                    </div>
                    <div className={cx('suggestions-item')}>
                        <Image src={images.mark} className={cx('suggestions-item__icon')} />
                        <p className={cx('suggestions-item__name')}>Go to market</p>
                    </div>
                </div>
            </div>
            <div className={'row ' + cx('suggestions-content')}>
                    {productForYou.map((product, index) => {
                        return <ProductItem key={index} product={product} ></ProductItem>;
                    })}
            </div>
        </div>
    );
}
export default Suggestion;
