import styles from './ProductCarousel.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import classNames from 'classnames/bind';
import slugify from 'slugify';
import './Slider.scss';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import images from '~/assets/images';

const cx = classNames.bind(styles);
function ProductCarousel({ products = [] }) {
    const formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
    });

    // "$1,000.00"

    return (
        <div className="product-carousel">
            <Slider infinite={false} initialSlide={0} slidesToShow={5} slidesToScroll={5} speed={500}>
                {products.map((product, index) => {
                    const quantity_sold = product.promotion_quantity - product.remaining_quantity;
                    const price = formatter.format(product.price * (1- product.percent/100));
                    return (
                        <div key={index} className={cx('product')}>
                            {/* / */}
                            <Link className={cx('product-link')} to={slugify(product.name,{
                                replacement: '-', // replace spaces with replacement character, defaults to `-`
                                remove: undefined, // remove characters that match regex, defaults to `undefined`
                                lower: true, // convert to lower case, defaults to `false`
                                strict: true, // strip special characters except replacement, defaults to `false`
                                locale: 'vi', // language code of the locale to use
                                trim: true, // trim leading and trailing replacement chars, defaults to `true`
                            })+`?id=${product.id_product}`}>
                                <Image
                                    className={cx('image-product')}
                                    alt={product.image_name}
                                    src={`http://localhost:3001/images/products/${product.image_link}`}
                                />
                                <div className={cx('product-price_group')}>
                                    <div className={cx('product-price')}> {price} 
                                    <span className={cx('product-price__percent')}>{-product.percent}%</span>
                                    </div>
                                </div>
                                <div
                                    className={cx('product-status', {
                                        active: product.promotion_status === 'selling',
                                    })}
                                >
                                    <div className={cx('product-status__content')}>
                                        {product.promotion_status === 'selling' ? (
                                            <>
                                                Sold {quantity_sold}
                                                <img className={cx('fire-icon')} alt="" src={images.fireIcon} />
                                            </>
                                        ) : (
                                            'Just opened'
                                        )}
                                    </div>
                                    <div
                                        className={cx('product-status__process')}
                                        style={{ width: `${(quantity_sold / product.promotion_quantity) * 100}%` }}
                                    ></div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}
export default ProductCarousel;
