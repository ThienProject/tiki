import classNames from "classnames/bind";
import styles from './Product.module.scss';
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react";
import * as productService from '~/apiServices/productService';

function Product()
{
    const cx = classNames.bind(styles);
    const [product, setProduct] = useState();
    console.log(product);
    const [searchParams, setSearchParams] = useSearchParams();
    const idProduct = searchParams.get('id');
    useEffect(()=>{
        const fetchApi = async () => {
            const result = await productService.getProductLimit(0,1,'products',idProduct);
            if (result) {
                setProduct(result);
            }
        };
        fetchApi();
    },[])
    
    //console.log(searchParams.get('id'));
  
    return  <div className={cx('Product')}>
        <h1> Product</h1>
    </div>
}
export default Product