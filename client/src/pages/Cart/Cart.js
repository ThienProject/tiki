import classNames from 'classnames/bind';
import style from './Cart.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faShop, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeAmountCart, getCart } from './cartSlice';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import images from '~/assets/images';
import ChangeQuantity from '../component/ChangeQuantity';
import slugify from 'slugify';
import { FastIcon } from '~/components/Icons';
const cx = classNames.bind(style);
function Cart() {
    const [cart, setCart] = useState([]);
    const { items, total } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    return (
        <div className={cx('wrapper', 'wide grid')}>
            <h1 className={cx('title')}>CART</h1>
            <section className={cx('cart-content', 'row')}>
                <div className={cx('cart-left', 'l-9')}>
                    <div className={cx('cart-header')}>
                        <div className='row'>
                            <div className='col l-6'>
                            <div className={cx('product-item__left')}>
                                <p className={cx('cart-header_item')}>
                                    <label className={cx('checkbox-container')}>
                                        All ({total} items)
                                        <input
                                            className={cx('check-input', 'check-all-item')}
                                            id={cx('check-all-item')}
                                            type="checkbox"
                                        />
                                        <span className={cx('checkmark')}></span>
                                    </label>
                                </p>
                            </div>
                            </div>
                            
                            <div className='col l-6'>
                            <div className={cx('product-item__right')}>
                                <p className={cx('cart-header_item')}>Unit price</p>
                                <p className={cx('cart-header_item')}>Amount</p>
                                <p className={cx('cart-header_item')}>Into money</p>
                                <FontAwesomeIcon
                                    className={cx('cart-header_item', 'btn_remove-selected')}
                                    icon={faTrashCan}
                                />
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('cart-list')}>
                        {items.map((seller) => {
                            return (
                                <div key={seller.id_shop} className={cx('cart-seller')}>
                                    <div className={cx('seller-head')}>
                                        <label className={cx('checkbox-container')}>
                                            <input
                                                className={cx('check-input', 'check-all-item')}
                                                id={cx('check-all-item')}
                                                type="checkbox"
                                            />
                                            <span className={cx('checkmark')}></span>
                                        </label>

                                        <Link className={cx('seller-link')} to={'/shop'}>
                                            <FontAwesomeIcon className={cx('seller-icon')} icon={faShop} />
                                            <h2 className={cx('seller-name')}>{seller.shop_name}</h2>
                                            <FontAwesomeIcon className={cx('seller-icon')} icon={faChevronRight} />
                                        </Link>
                                    </div>

                                    <div className={cx('product-list')}>
                                        {seller.products.map((item, index) => {
                                            return (
                                                <div className={cx('product-item', 'row')} key={item.id_cart}>
                                                    <div className={'col l-6'}>
                                                        <div className={cx('product-item__left')}>
                                                            <label className={cx('checkbox-container')}>
                                                                <input
                                                                    className={cx('check-input', 'check-all-item')}
                                                                    id={cx('check-all-item')}
                                                                    type="checkbox"
                                                                />
                                                                <span className={cx('checkmark')}></span>
                                                            </label>

                                                            <Link
                                                                className={cx('product-link')}
                                                                to={`/${slugify(item.product_name)}?id=${
                                                                    item.id_product
                                                                }`}
                                                            >
                                                                <img className={cx('product-image')} src={item.image} />
                                                                <div className={cx('product_name-group')}>
                                                                    <h3 className={cx('product-name')}>
                                                                        {item.product_name}
                                                                    </h3>
                                                                    <div className={cx('sub-name__icon')}>
                                                                        <FastIcon />
                                                                        <p>Economical delivery</p>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>

                                                    <div className="col l-6">
                                                        <div className={cx('product-item__right')}>
                                                            <div className={cx('price')}>
                                                                {item.newPrice && (
                                                                    <p className={cx('old-pice')}>{item.price}</p>
                                                                )}
                                                                <p className={cx('current-pice')}>{item.price}</p>
                                                            </div>
                                                            <ChangeQuantity 
                                                  
                                                                changeAmountCart = {
                                                                    (quantity)=> {((id_shop, id_cart)=>{ 

                                                                        const params = {id_shop, id_cart, quantity}
                                                                        const action = changeAmountCart(params);
                                                                        dispatch(action);
                                                                    })(seller.id_shop,item.id_cart)}
                                                                    }
                                                                init={item.quantity} 
                                        
                                                            >

                                                            </ChangeQuantity>

                                                            <div className={cx('into-money')}>{item.into_money}</div>
                                                            <FontAwesomeIcon
                                                                className={cx('btn_remove-selected')}
                                                                icon={faTrashCan}
                                                                onClick = {()=>{
                                                                    const params = {id_shop : seller.id_shop, id_cart :item.id_cart, quantity: 0};
                                                                    const action = changeAmountCart(params);
                                                                    dispatch(action);
                                                                }}
                                                            ></FontAwesomeIcon>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={cx('cart-right', 'l-3')}></div>
            </section>
        </div>
    );
}

Cart.propTypes = {};
export default Cart;
