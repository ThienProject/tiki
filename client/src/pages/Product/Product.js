import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as productService from '~/apiServices/productService';
import Breadcrumb from '~/components/Breadcrumb';
import { StarIcon } from '~/components/Icons';
import images from '~/assets/images';
const cx = classNames.bind(styles);
function Product() {
    const cx = classNames.bind(styles);
    const [searchParams, setSearchParams] = useSearchParams();
    const [product, setProduct] = useState();
    const [imageCurrent, setImageCurrent] = useState('');

    
    const star = product && product.rates && product.rates.reduce((total,rate)=>total + rate.star,0);
    const countRate = product && ((product.rates && product.rates.length) || '0')  ;
    const starPercent = ((star / (countRate * 5) ) * 100) || 0 ;
    const idProduct = searchParams.get('id');

    useEffect(() => {
        const fetchApi = async () => {
            const result = await productService.getProductLimit(0, 1, 'products', idProduct);
            if (result) {
                setProduct(...result);
            }
        };
        fetchApi();
    }, []);

    function handlePreview(e) {
        const imgThumbnails = document.querySelectorAll(`.${cx('thumbnail-item')} img`);
        imgThumbnails.forEach((img) => img.classList.remove(cx('active')));
        e.target.classList.add(cx('active'));
        setImageCurrent(e.target.src);
    }
    //console.log(searchParams.get('id'));

    return (
        <div className={cx('product grid wide')}>
            {product && (
                <>
                    <div className={cx('breadcrumb')}>
                        <Breadcrumb
                            parentCrumb={product.cate_name}
                            middleCrumb={product.type_name}
                            childCrumb={product.name}
                        />
                    </div>
                    <div className={cx('product-content')}>
                        <div className="row">
                            <div className="col l-4-5">
                                <div className={cx('product__img-group')}>
                                    <div className={cx('preview')}>
                                        {
                                            <div className={cx('preview-item')}>
                                                {' '}
                                                <img
                                                    alt=""
                                                    src={
                                                        imageCurrent !== ''
                                                            ? imageCurrent
                                                            : product.images[0].image_link
                                                    }
                                                ></img>{' '}
                                            </div>
                                        }
                                    </div>

                                    <div className={cx('thumbnail-list')}>
                                        {product.images.map(
                                            (img, index) =>
                                                index < 5 && (
                                                    <div key={index} className={cx('thumbnail-item')}>
                                                        <img
                                                            className={index === 0 ? cx('active') : ''}
                                                            data-index={index}
                                                            onClick={handlePreview}
                                                            alt={img.image_name}
                                                            src={img.image_link}
                                                        ></img>
                                                    </div>
                                                ),
                                        )}

                                        {product.images.length > 6 && (
                                            <div className={cx('thumbnail-item', 'thumbnail-item--more')}>
                                                <div>
                                                    <img
                                                        onClick={handlePreview}
                                                        alt={product.images[5].image_name}
                                                        src={product.images[5].image_link}
                                                    ></img>
                                                </div>

                                                <span className={cx('thumbnail-item__span')}>
                                                    view more {product.images.length - 5 } images
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col l-7-5">
                                <div className={cx('product-detail')}>
                                    <div className={cx('product-detail__top')}>
                                        <p className={cx('product-detail__top-brand')}>
                                            Brand: <span>{product.brand}</span>
                                        </p>
                                      
                                    <h1 className={cx('product-name')}>{product.name} </h1>

                                    <div className={cx('product__rate-basic')}>
                                        <div className={cx('product__rate-basic-stars')}>
                                            <div className={cx('product__rate-basic-stars--no-color')}>
                                                <StarIcon className={cx('product__rate-basic-star')} />
                                                <StarIcon className={cx('product__rate-basic-star')} />
                                                <StarIcon className={cx('product__rate-basic-star')} />
                                                <StarIcon className={cx('product__rate-basic-star')} />
                                                <StarIcon className={cx('product__rate-basic-star')} />
                                            </div>
                                            <div style={{width : starPercent  + '%' }} className={cx('product__rate-basic-stars--yellow')}>
                                                <StarIcon color="#fdd836" className={cx('product__rate-basic-star')} />
                                                <StarIcon color="#fdd836" className={cx('product__rate-basic-star')} />
                                                <StarIcon color="#fdd836" className={cx('product__rate-basic-star')} />
                                                <StarIcon color="#fdd836" className={cx('product__rate-basic-star')} />
                                                <StarIcon color="#fdd836" className={cx('product__rate-basic-star')} />
                                            </div>
                                        </div>
                                        <div className={cx('product__rate-basic-view')}>
                                            (View {countRate } rate)
                                        </div>
                                        <div className={cx('product-sold')}>Sold {product.sold}</div>
                                    </div>  
                                    </div>
                                    <div className={cx('product-detail__center')}>
                                        <div className='row'>
                                            <div className='col l-9'>
                                                <div className={cx('order')}>
                                                    <div className={cx('price')}>
                                                        <h1 className={cx('price-new')}>
                                                            {product.price_discount ? product.price_discount : product.price}
                                                        </h1>
                                                        {product.price_discount && <div className={cx('price-old')}>
                                                            {product.price}
                                                        </div> }
                                                        {product.percent && <div className={cx('percent-promotion')}>
                                                            { -product.percent +'%'}
                                                        </div>
                                                        }    
                                                     </div>

                                                     {
                                                        product.colors && 
                                                        <div className={cx('colors')}>{
                                                                    product.colors.map((color, index )=> 
                                                                        <div 
                                                                            className={cx('color-item')}
                                                                            key = {index}
                                                                        >
                                                                            <img 
                                                                                className={cx('color-item__img')}
                                                                                alt = {color.color_name}
                                                                                src = {color.color_image}>
                                                                            </img>
                                                                            <span>{color.color_name}</span>
                                                                            <img className={cx('check-color-icon')} alt='check' src={images.check}></img>
                                                                        </div>
                                                                    )
                                                                }
                                                            
                                                        </div>
                                                       

                                                     }
                                                     {
                                                       /* product.size &&  */
                                                       <div className={cx('sizes')}>
                                                            {
                                                                product.colors.map((color, index )=> 
                                                                <button 
                                                                    className={cx('size-item')}
                                                                    key = {index}
                                                                >
                                                                    <span>{color.color_name}</span>
                                                                    <img className={cx('check-size-icon')} alt='check' src={images.check}></img>
                                                                </button>
                                                            )
                                                            }
                                                       </div>
                                                     }
                                                </div>
                                            </div>
                                            <div className='col l-3'>
                                                <div className={cx('store-info')}></div>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>
                        <h1> Product </h1>
                    </div>
                </>
            )}
        </div>
    );
}
export default Product;
