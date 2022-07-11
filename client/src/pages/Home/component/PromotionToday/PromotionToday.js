import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import images from '~/assets/images';
import Image from '~/components/Image';
import styles from './PromotionToday.module.scss';
import Countdown from '~/pages/component/Countdown';
import * as productService from '~/apiServices/productService';
import ProductCarousel from '~/pages/component/ProductCarousel';

const cx = classNames.bind(styles);
function PromotionToday() {
    const [promotionToDay, setPromotionToDay] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result_promotion_today = await productService.getPromotionToDay('1');
            if (result_promotion_today) {
                setPromotionToDay(result_promotion_today);
            }
        };
        fetchApi();
    }, []);

    return (
        <div className={cx('carousel-shock')}>
            <div className={cx('carousel-title')}>
                <div className={cx('carousel-title__left')}>
                    <Image src={images.price_shock} />
                    <Image className={cx('dealFlashIcon')} src={images.dealFlashIcon} />
                    <Image src={images.today} />
                    {promotionToDay.length > 0 && (
                        <Countdown end={promotionToDay[0].date_end} className={cx('countdown')}></Countdown>
                    )}
                </div>

                <Link className={cx('more')} to="/">
                    View More
                </Link>
            </div>
            <ProductCarousel products={promotionToDay} />
        </div>
    );
}
export default PromotionToday;
