import slugify from 'slugify';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faShop, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import style from './Cart.module.scss';
import { FastIcon } from '~/components/Icons';
import { changeAmountCart, deleteAllCart, updateChecked } from './cartSlice';
import ChangeQuantity from '../component/ChangeQuantity';
import Button from '~/components/Button';


const cx = classNames.bind(style);
function Cart() {
    const { items, total, money_checked, checked} = useSelector((state) => state.cart);
    const [cart, setCart] = useState({total : 0, cartItem : items, money_checked, checked});
    const dispatch = useDispatch();  
    useEffect(() => {
        setCart({total : 0, cartItem : items, money_checked, checked});
    }, [items]);

    const formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
    })


    const chooseToBuy = (arrPrev, event, seller_id = false) => {
        let total = 0;
        const newArray = arrPrev.cartItem.map((item_shop) => {
            const isActiveShop = seller_id && seller_id === item_shop.id_shop;
            return {
                ...item_shop,
                active: seller_id ? (isActiveShop ? event.target.checked : item_shop.checked) : event.target.checked,
                products: item_shop.products.map((item_product) => {
                    if (isActiveShop || seller_id === false) {
                        if(event.target.checked){
                            const  priceFloat = Number.parseFloat((item_product.into_money).substring(0, item_product.into_money.length - 2).replace(/\./g, ''));
                            total +=  priceFloat;
                        }
                        return { ...item_product, active: event.target.checked };
                    } else {
                        return item_product;
                    }
                }),
            };
        });
        console.log(newArray);
        return {total, newArray};
    };
    return (
        <div className={cx('wrapper', 'wide grid')}>
            <h1 className={cx('title')}>CART</h1>
            <section className={cx('cart-content', 'row')}>
                <div className={cx('cart-left', 'col l-9')}>
                    <div className={cx('cart-header')}>
                        <div className="row">
                            <div className="col l-6">
                                <div className={cx('product-item__left')}>
                                    <p className={cx('cart-header_item')}>
                                        <label className={cx('checkbox-container')}>
                                            All ({total} items)
                                            <input
                                                className={cx('check-input', 'check-all-item')}
                                                id={cx('check-all-item')}
                                                type="checkbox"
                                                checked = {checked ? 'checked': false}
                                                onChange={ async (e) => {
                                                    const checked = e.target.checked;
                                                    try {
                                                        const action = await updateChecked({checked});
                                                        dispatch(action);
                                                    } catch (error) {
                                                        throw error;
                                                    }
                                                }}
                                            />
                                            <span className={cx('checkmark')}></span>
                                        </label>
                                    </p>
                                </div>
                            </div>

                            <div className="col l-6">
                                <div className={cx('product-item__right')}>
                                    <p className={cx('cart-header_item')}>Unit price</p>
                                    <p className={cx('cart-header_item')}>Amount</p>
                                    <p className={cx('cart-header_item')}>Into money</p>
                                    <FontAwesomeIcon
                                        className={cx('cart-header_item', 'btn_remove-selected')}
                                        icon={faTrashCan}
                                        onClick = {async ()=>{
                                            const action = await deleteAllCart();
                                            dispatch(action);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('cart-list')}>
                        {cart?.cartItem?.map((seller, indexShop) => {
                            return (
                                <div key={seller.id_shop} className={cx('cart-seller')}>
                                    <div className={cx('seller-head')}>
                                        <label className={cx('checkbox-container')}>
                                            <input
                                                className={cx('check-input', 'check-all-item')}
                                                id={cx('check-all-item')}
                                                type="checkbox"
                                                checked={seller?.checked ? 'checked' : false}
                                                onChange={async (e) => {
                                                    const checked = e.target.checked;
                                                    try {
                                                        const action = await updateChecked({ id_shop : seller.id_shop, checked});
                                                        dispatch(action);
                                                    } catch (error) {
                                                        throw error;
                                                    }
                                                   
                                                }}
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
                                                                    checked={item?.checked ? 'checked' : false}
                                                                    onChange={async (e) => {
                                                                        const checked = e.target.checked;
                                                                        const action = await updateChecked({id_shop : seller.id_shop ,id_cart :item.id_cart, checked});
                                                                        dispatch(action);
                                                                    }}
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
                                                                changeAmountCart={(quantity) => {
                                                                    ((id_shop, id_cart) => {
                                                                        const params = { id_shop, id_cart, quantity };
                                                                        const action = changeAmountCart(params);
                                                                        dispatch(action);
                                                                    })(seller.id_shop, item.id_cart);
                                                                }}
                                                                init={item.quantity}
                                                            ></ChangeQuantity>

                                                            <div className={cx('into-money')}>{item.into_money}</div>
                                                            <FontAwesomeIcon
                                                                className={cx('btn_remove-selected')}
                                                                icon={faTrashCan}
                                                                onClick={() => {
                                                                    const params = {
                                                                        id_shop: seller.id_shop,
                                                                        id_cart: item.id_cart,
                                                                        quantity: 0,
                                                                    };
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
                <div className={cx('cart-right', 'col l-3')}>
                    <div className={cx('address', 'left-cart_container')}></div>
                    <div className={cx('voucher', 'left-cart_container')}></div>
                    <div className={cx('money', 'left-cart_container')}>
                        <div className={cx('money-item')}>
                            <p className={cx('money-item__title')}>Provisional</p>
                            <p className={cx('money-item__value')}>{money_checked}</p>
                        </div>
                        <div className={cx('money-item')}>
                            <p className={cx('money-item__title')}>Discount</p>
                            <p className={cx('money-item__value')}>0đ</p>
                        </div>
                        <br/>
                        <div className={cx('money-item')}>
                            <p className={cx('money-item__title')}>Total Amount</p>
                            <p className={cx('money-item__value')}>0đ</p>
                        </div>
                    </div>
                    <Button className={cx('btn-buy')} primary red size="large">
                        Buy
                    </Button>
                </div>
            </section>
        </div>
    );
}

Cart.propTypes = {};
export default Cart;
