import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as productService from '~/apiServices/productService';
import * as userService from '~/apiServices/usersService';
import Breadcrumb from '~/components/Breadcrumb';
import { StarIcon } from '~/components/Icons';
import styles from './Product.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import SelectAddress from '../component/SelectAddress';

const cx = classNames.bind(styles);
function Product() {
    const cx = classNames.bind(styles);
    const [searchParams, setSearchParams] = useSearchParams();
    const [product, setProduct] = useState();
    const [imageCurrent, setImageCurrent] = useState('');
    const [address, setAddress] = useState([]);

    const star = product && product.rates && product.rates.reduce((total, rate) => total + rate.star, 0);
    const countRate = product && ((product.rates && product.rates.length) || '0');
    const starPercent = (star / (countRate * 5)) * 100 || 0;
    const idProduct = searchParams.get('id');

    useEffect(() => {
        const fetchApi = async () => {
            const resultProduct = await productService.getProductLimit(0, 1, 'products', idProduct);
            if (resultProduct) {
                setProduct(...resultProduct);
            }

            const resultAddress = await userService.getAddress(14);
            if (resultAddress) {
                setAddress(resultAddress);
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
    const handleCloseAddress = (e) => {
        const addressElement = e.target.closest('.' + cx('address'));
        const addressBox = e.target.closest('.' + cx('address--select'));
        const currentAddress = e.target.closest('.' + cx('current-address'));
        if ((!addressBox && !currentAddress) || e.target.matches('.' + cx('close'))) {
            addressElement.classList.remove(cx('address--active'));
        }
    };
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
                                                <img
                                                    alt=""
                                                    src={
                                                        imageCurrent !== ''
                                                            ? imageCurrent
                                                            : product.images[0].image_link
                                                    }
                                                ></img>
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
                                                    view more {product.images.length - 5} images
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
                                    <div className={cx('product-detail__center')}>
                                        <div className="row">
                                            <div className="col l-9">
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
                                                                <div className={cx('color-item')} key={index}>
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
                                                                <button className={cx('size-item')} key={index}>
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
                                                    {
                                                        <div className={cx('address')} onClick={handleCloseAddress}>
                                                            <div
                                                                className={cx('current-address')}
                                                                onClick={(e) => {
                                                                    const eL = e.target.closest('.' + cx('address'));
                                                                    const classN = cx('address--active');
                                                                    if (classN) {
                                                                        eL.classList.add(classN);
                                                                    }
                                                                }}
                                                            >
                                                                {address.length > 0 ? (
                                                                    <p>
                                                                        Ship to{' '}
                                                                        <strong>
                                                                            {address[0].detail_address},{' '}
                                                                            {address[0].village_name},{' '}
                                                                            {address[0].district_name},{' '}
                                                                            {address[0].city_name}{' '}
                                                                        </strong>{' '}
                                                                        - <span>Change address</span>{' '}
                                                                    </p>
                                                                ) : (
                                                                    <p>
                                                                        Please{' '}
                                                                        <strong> enter your delivery address </strong>{' '}
                                                                        to receive the most accurate delivery time &
                                                                        cost forecast.
                                                                    </p>
                                                                )}
                                                            </div>

                                                            {address && (
                                                                <div className={cx('overlay')}>
                                                                    <div className={cx('address--select')}>
                                                                        <FontAwesomeIcon
                                                                            onClick={handleCloseAddress}
                                                                            className={cx('close')}
                                                                            icon={faTimes}
                                                                        />
                                                                        <p className={cx('overlay-title')}>
                                                                            Delivery address
                                                                        </p>
                                                                        <p className={cx('overlay-description')}>
                                                                            Please select the delivery address to
                                                                            receive the most accurate forecast of
                                                                            delivery time and packaging and shipping
                                                                            fees{' '}
                                                                        </p>
                                                                        <div className={cx('list-address')}>
                                                                            {address.map((add, index) => {
                                                                                return (
                                                                                    <div
                                                                                        className={cx('address-item')}
                                                                                        key={index}
                                                                                    >
                                                                                        <input
                                                                                            type="radio"
                                                                                            name="address"
                                                                                            id={add.id_address}
                                                                                        />
                                                                                        <span
                                                                                            className={cx(
                                                                                                'checked-icon',
                                                                                            )}
                                                                                        ></span>
                                                                                        <label
                                                                                            htmlFor={add.id_address}
                                                                                        >{`${add.detail_address}, ${add.village_name}, ${add.district_name}, ${add.city_name}`}</label>
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                            <div className={cx('address-item')}>
                                                                                <input
                                                                                    type="radio"
                                                                                    name="address"
                                                                                    id={cx('more-select')}
                                                                                />
                                                                                <span
                                                                                    className={cx('checked-icon')}
                                                                                ></span>
                                                                                <label htmlFor="more-select">
                                                                                    Select other area
                                                                                </label>
                                                                                <SelectAddress
                                                                                    className={cx('address-another')}
                                                                                ></SelectAddress>
                                                                            </div>
                                                                        </div>
                                                                        <Button
                                                                            className={cx('btn-select-address')}
                                                                            red
                                                                            size="large"
                                                                        >
                                                                            SHIP TO THIS ADDRESS
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <div className={cx('delivery-charges')}>
                                                                <div className={cx('logo-group')}>
                                                                    <img className={cx('logo-img')} alt='' src={images.tikiFast} />
                                                                </div>
                                                                
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col l-3">
                                                <div className={cx('store-info')}></div>
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
