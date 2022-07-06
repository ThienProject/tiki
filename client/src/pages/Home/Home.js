import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Image from '~/components/Image';
import images from '~/assets/images';
import styles from './Home.module.scss';
import SliderCPN from '../component/Slider';
import TypeCarousel from '../component/TypeCarousel';
import ProductCarousel from '../component/ProductCarousel';
import * as bannersService from '~/apiServices/BannersService';
import * as productService from '~/apiServices/productService';
import * as categoryService from '~/apiServices/categoryService';
import videos from '~/assets/videos';
import Countdown from '../component/Countdown';

const cx = classNames.bind(styles);
function Home() {
    const [slider, setSlider] = useState([]);
    const [banners, setBanners] = useState([]);
    const [category, setCategory] = useState([]);
    const [promotionToDay, setPromotionToDay] = useState([]);
   
    useEffect(() => {
        const fetchApi = async () => {
            const result_slider = await bannersService.getSliderHomeTop();
            const result_banners = await bannersService.getBannerHome();
            const result_promotion_today = await productService.getPromotionToDay('1');
            const result_category = await categoryService.getCategory();
            if (result_slider) {
                setSlider(result_slider);
            }
            if (result_banners) {
                setBanners(result_banners);
            }
            if (result_promotion_today) {
                setPromotionToDay(result_promotion_today);
            }
            if(result_category){
                setCategory(result_category);
            }
        };
        fetchApi();
    }, []);
    console.log(promotionToDay)
    const banner_top = banners.find((value) => {
        return value.name === 'banner_home_top';
    });
    return (
        <div className="wide grid">
            <div className={cx('home-wrapper')}>
                <TypeCarousel category = {category}/>
                <div
                    className={cx('home-top', {
                        'sm-gutter': true,
                        row: true,
                    })}
                >
                    <div className={' col l-8 c-12 m-12'}>
                        <SliderCPN slider={slider} />
                    </div>
                    <div className={'col l-4 c-0 m-0'}>
                        {banner_top && (
                            <img
                                className={cx('img-banner__top')}
                                alt={banner_top.name}
                                src={`http://localhost:3001/images/banners/${banner_top.image}`}
                            />
                        )}
                    </div>
                </div>

                <div
                    className={cx('home-top', {
                        'sm-gutter': true,
                        row: true,
                    })}
                >
                    <div className="l-7 m-12">
                        <div className={cx('carousel-shock')}>
                            <div className={cx('carousel-title')}>
                                <div className={cx('carousel-title__left')}>
                                    <Image src={images.price_shock} />
                                    <Image className={cx('dealFlashIcon')} src={images.dealFlashIcon} />
                                    <Image src={images.today} />
                                    {
                                        promotionToDay.length> 0 &&
                                        <Countdown end={promotionToDay[0].date_end} className={cx('countdown')}></Countdown>
                                    }    
                                </div>
                                
                                <Link className={cx('more')} to="/">View More</Link>
                            </div>
                            <ProductCarousel products={promotionToDay} />
                        </div>
                    </div>
                    <div className="l-5 m-0">
                        <div className={cx('video-group')}>
                            <video className={cx('video-astra')}   controls>
                                    <source src={videos.astra} type="video/mp4"/>
                            </video>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;
