import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './BannerTop.module.scss';
import * as bannersService from '~/apiServices/BannersService';
const cx = classNames.bind(styles);
function BannerTop() {
    const [banners, setBanners] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result_banners = await bannersService.getBannerHome();
            if (result_banners) {
                setBanners(result_banners);
            }
        };
        fetchApi();
    }, []);

    const banner_top = banners.find((value) => {
        return value.name === 'banner_home_top';
    });

    return (
        <>
            {banner_top && (
                <img
                    className={cx('img-banner__top')}
                    alt={banner_top.name}
                    src={`http://localhost:3001/images/banners/${banner_top.image}`}
                />
            )}
        </>
    );
}
export default BannerTop;
