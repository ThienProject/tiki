import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import images from '~/assets/images';
import Button from '~/components/Button';
import styles from './Product.module.scss';
import { useToast } from '~/contexts/Toast';
import { addCart } from '../Cart/cartSlice';
import Breadcrumb from '~/components/Breadcrumb';
import ImagePreview from '../component/ImagePreview';
import { ChatIcon, StarIcon } from '~/components/Icons';
import DisplayAddress from '../component/DisplayAddress';
import ChangeQuantity from '../component/ChangeQuantity';
import * as productService from '~/apiServices/productService';
const cx = classNames.bind(styles);
function Product() {
    const cx = classNames.bind(styles);

    const [searchParams, setSearchParams] = useSearchParams();
    const navigation = useNavigate();
    const [product, setProduct] = useState({idProduct :searchParams.get('id')});
    const [choice, setChoice] = useState({
                id_product: null,
                quantity: 0,
                id_size: null,
                id_color: null,
                image : null
       
    });
    
    useEffect(() => {
        if(product.idProduct){
            const fetchApi = async () => {
                const resultProduct = await productService.getProductLimit(0, 1, 'products', product?.idProduct);
                if (resultProduct) {
                    setProduct(...resultProduct);
                }
            };
            fetchApi();
        }
        else{
           navigation('/');
        }
        
    }, []);
    const { warn, success } = useToast();

    const star = product && product.rates && product.rates.reduce((total, rate) => total + rate.star, 0);
    const countRate = product && ((product.rates && product.rates.length) || '0');
    const starPercent = (star / (countRate * 5)) * 100 || 0;

    const dispatch = useDispatch();

    /* id_shop: null,
        shop_name : null,
        products: [
            {
                id_product: null,
                quantity: 0,
                id_size: null,
                id_color: null,
            }
        ] */
    const handleAddCart = (product) => {
        console.log(product);
        if (
            choice.quantity < 1 ||
            (product.colors && choice.id_color === null) ||
            (product.sizes && choice.id_size === null)
        ) {
            warn('please select a quantity, size, color !');
        } else {
            
            const data = {
                id_shop: product.id_user,
                shop_name : product.shop_name,
                products: [
                    {   
                        ...choice,
                        id_product: product.id_product,  
                        product_name: product.product_name,
                        image : product.colors ? choice.image : product.images[0].image_link ,
                        price : product.price,
                    }
                ]
            }
            const action = addCart(data);
            dispatch(action);
            success('Add to cart success !');
        }
    };
    //console.log(searchParams.get('id'));
    return (
        <div className={cx('product grid wide')}>
            {product.product_name && (
                <>
                    <div className={cx('breadcrumb')}>
                        <Breadcrumb
                            parentCrumb={product.cate_name}
                            middleCrumb={product.type_name}
                            childCrumb={product.product_name}
                        />
                    </div>
                    <div className={cx('product-content')}>
                        <div className="row">
                            <div className="col l-4-5">
                                <ImagePreview images={product.images} />
                            </div>
                            <div className="col l-7-5">
                                <div className={cx('product-basic')}>
                                    <div className={cx('product-basic__top')}>
                                        <p className={cx('product-basic__top-brand')}>
                                            Brand: <span>{product.brand}</span>
                                        </p>

                                        <h1 className={cx('product-name')}>{product.product_name} </h1>

                                        <div className={cx('product__rate-basic')}>
                                            <div className={cx('product__rate-basic-stars')}>
                                                <div className={cx('product__rate-basic-stars--no-color')}>
                                                    <StarIcon className={cx('product__rate-basic-star')} />
                                                    <StarIcon className={cx('product__rate-basic-star')} />
                                                    <StarIcon className={cx('product__rate-basic-star')} />
                                                    <StarIcon className={cx('product__rate-basic-star')} />
                                                    <StarIcon className={cx('product__rate-basic-star')} />
                                                </div>
                                                <div
                                                    style={{ width: starPercent + '%' }}
                                                    className={cx('product__rate-basic-stars--yellow')}
                                                >
                                                    <StarIcon
                                                        color="#fdd836"
                                                        className={cx('product__rate-basic-star')}
                                                    />
                                                    <StarIcon
                                                        color="#fdd836"
                                                        className={cx('product__rate-basic-star')}
                                                    />
                                                    <StarIcon
                                                        color="#fdd836"
                                                        className={cx('product__rate-basic-star')}
                                                    />
                                                    <StarIcon
                                                        color="#fdd836"
                                                        className={cx('product__rate-basic-star')}
                                                    />
                                                    <StarIcon
                                                        color="#fdd836"
                                                        className={cx('product__rate-basic-star')}
                                                    />
                                                </div>
                                            </div>
                                            <div className={cx('product__rate-basic-view')}>
                                                (View {countRate} rate)
                                            </div>
                                            <div className={cx('product-sold')}>Sold {product.sold}</div>
                                        </div>
                                    </div>
                                    <div className={cx('product-basic__center')}>
                                        <div className="row">
                                            <div className="col l-7">
                                                <div className={cx('order')}>
                                                    <div className={cx('price')}>
                                                        <h1 className={cx('price-new')}>
                                                            {product.price_discount
                                                                ? product.price_discount
                                                                : product.price}
                                                        </h1>
                                                        {product.price_discount && (
                                                            <div className={cx('price-old')}>{product.price}</div>
                                                        )}
                                                        {product.percent && (
                                                            <div className={cx('percent-promotion')}>
                                                                {-product.percent + '%'}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {product.colors && (
                                                        <div className={cx('colors')}>
                                                            {product.colors.map((color, index) => (
                                                                <div
                                                                    className={cx('color-item', {
                                                                        active: choice?.id_color === color.id_color,
                                                                    })}
                                                                    key={index}
                                                                    onClick={() => {
                                                                        setChoice((prev) => {
                                                                            const newChoice = {
                                                                                ...prev,
                                                                                id_color: color.id_color,
                                                                                image : color.image_link
                                                                            };
                                                                            return newChoice;
                                                                        });
                                                                    }}
                                                                >
                                                                    <img
                                                                        className={cx('color-item__img')}
                                                                        alt={color.color_name}
                                                                        src={color.image_link}
                                                                    ></img>
                                                                    <span>{color.color_name}</span>
                                                                    <img
                                                                        className={cx('check-color-icon')}
                                                                        alt="check"
                                                                        src={images.check}
                                                                    ></img>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {product.sizes && (
                                                        <div className={cx('sizes')}>
                                                            {product.sizes.map((size, index) => (
                                                                <button
                                                                    onClick={() => {
                                                                        setChoice((prev) => {
                                                                            const newChoice = {
                                                                                ...prev,
                                                                                id_size: size.id_size,
                                                                            };
                                                                            return newChoice;
                                                                        });
                                                                    }}
                                                                    className={cx('size-item', {
                                                                        active: choice?.id_size === size.id_size,
                                                                    })}
                                                                    key={index}
                                                                >
                                                                    <span>{size.size_name}</span>
                                                                    <img
                                                                        className={cx('check-size-icon')}
                                                                        alt="check"
                                                                        src={images.check}
                                                                    ></img>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}

                                                    <DisplayAddress />

                                                    <div className={cx('quantity')}>
                                                        <p>Quantity</p>
                                                        <ChangeQuantity className={cx('change-quantity')} setChoice={setChoice} />
                                                    </div>
                                                    <div className={cx('action')}>
                                                        <Button
                                                            className={cx('btn-add')}
                                                            onClick={() => {
                                                                handleAddCart(product);
                                                            }}
                                                            red
                                                            size="large"
                                                        >
                                                            Add to Cart
                                                        </Button>
                                                        <div className={cx('chat')}>
                                                            <ChatIcon />
                                                            <p>Chat</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col l-5">
                                                <div className={cx('store-info')}>
                                                    <div className={cx('store-title')}>
                                                        <img
                                                            className={cx('avatar')}
                                                            src={product.avatar}
                                                            alt="avatar"
                                                        />
                                                        <h3 className={cx('store-name')}>{product.shop_name}</h3>
                                                    </div>
                                                    <div className={cx('store-follow')}>
                                                        <div className={cx('follow-detail')}>
                                                            <span>
                                                                4.8/5 <StarIcon color="yellow" />{' '}
                                                            </span>
                                                            <div className={cx('follow-subtitle')}>681</div>
                                                        </div>

                                                        <div className={cx('follow-detail')}>
                                                            <span>1.4k+</span>
                                                            <div className={cx('follow-subtitle')}>Theo dõi</div>
                                                        </div>
                                                        <div className={cx('follow-detail')}>
                                                            <span>97%</span>
                                                            <div className={cx('follow-subtitle')}>Phản hồi chat</div>
                                                        </div>
                                                    </div>
                                                    <div className={cx('store-action')}>
                                                        <button className={cx('action-view')}>
                                                            <img
                                                                className={cx('action-icon')}
                                                                alt="view"
                                                                src={images.shop}
                                                            />
                                                            <span>View Shop</span>
                                                        </button>
                                                        <button className={cx('action-view')}>
                                                            <img
                                                                className={cx('action-icon')}
                                                                alt="view"
                                                                src={images.add}
                                                            />
                                                            <span>Follow</span>
                                                        </button>
                                                    </div>
                                                    <div className={cx('insurance-list')}>
                                                        <div className={cx('insurance-item')}>
                                                            <span className={cx('insurance-title')}>
                                                                Warranty period
                                                            </span>
                                                            <span className={cx('insurance-value')}>12 months</span>
                                                        </div>
                                                        <div className={cx('insurance-item')}>
                                                            <span className={cx('insurance-title')}>Warranty form</span>
                                                            <span className={cx('insurance-value')}>Receipt</span>
                                                        </div>
                                                        <div className={cx('insurance-item')}>
                                                            <span className={cx('insurance-title')}>
                                                                Warranty place
                                                            </span>
                                                            <span className={cx('insurance-value')}>
                                                                Warranty genuine
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className={cx('value-affirmation')}>
                                                        <div className={cx('value-affirmation-item')}>
                                                            <img alt="" src={images.security} />
                                                            <p>Refund 111% if the goods are fake</p>
                                                        </div>
                                                        <div className={cx('value-affirmation-item')}>
                                                            <img alt="" src={images.like} />
                                                            <p>Oppen the box test receive</p>
                                                        </div>
                                                        <div className={cx('value-affirmation-item')}>
                                                            <img alt="" src={images.return} />
                                                            <p>Return within 30 days if product error</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
export default Product;
