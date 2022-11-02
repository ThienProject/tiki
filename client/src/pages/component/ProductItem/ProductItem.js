import styles from './ProductItem.module.scss';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import { StarIcon } from '~/components/Icons/Icons';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
const cx = classNames.bind(styles);

function ProductItem({ product, className }) {
    /*    console.log(product) */

    return (
        <Link
            to={
                '/' +
                slugify(product.product_name, {
                    replacement: '-', // replace spaces with replacement character, defaults to `-`
                    remove: undefined, // remove characters that match regex, defaults to `undefined`
                    lower: true, // convert to lower case, defaults to `false`
                    strict: true, // strip special characters except replacement, defaults to `false`
                    locale: 'vi', // language code of the locale to use
                    trim: true, // trim leading and trailing replacement chars, defaults to `true`
                }) +
                `?id=${product.id_product}`
            }
            className={cx('product-wrapper', className)}
        >
            {<Image className={cx('product-image')} src={product.images ? product.images[0].image_link : ''} />}
            <div className={cx('product-title')}>
                <p className={cx('product-title__content')}>{product.product_name}</p>
            </div>
            <div className={cx('product-rate')}>
                <div className={cx('product-rate_star')}>
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                </div>
                <div className={cx('product-rate_sold')}>Sold 1000+</div>
            </div>
            <div className={cx('product-price')}>
                {product.price_discount ? (
                    <div className={cx('product-price__discount')}>
                        {' '}
                        {product.price_discount}
                        <span className={cx('product-price__percent')}>{-product.percent}%</span>
                    </div>
                ) : (
                    product.price
                )}
            </div>
        </Link>
    );
}
export default ProductItem;
