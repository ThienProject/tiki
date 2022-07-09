import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Image from '~/components/Image';
import images from '~/assets/images';
import styles from './Home.module.scss';
import SliderCPN from '../component/Slider';
import TypeCarousel from '../component/TypeCarousel';
import ProductCarousel from '../component/ProductCarousel';
import BrandCarousel from '../component/BrandCarousel';
import * as bannersService from '~/apiServices/BannersService';
import * as productService from '~/apiServices/productService';
import * as categoryService from '~/apiServices/categoryService';
import * as brandService from '~/apiServices/brandsService';
import * as typeService from '~/apiServices/typesService';
import videos from '~/assets/videos';
import Countdown from '../component/Countdown';
import Suggestion from '../component/Suggestion';

const cx = classNames.bind(styles);
function Home() {
    const [slider, setSlider] = useState([]);
    const [banners, setBanners] = useState([]);
    const [category, setCategory] = useState([]);
    const [promotionToDay, setPromotionToDay] = useState([]);
    const [brandGenuine, setBrandGenuine] = useState([]);
    const [typeFeatured, setTypeFeatured] = useState([]);
    console.log("reder ....");
    useEffect(() => {
        const fetchApi = async () => {
            const result_slider = await bannersService.getSliderHomeTop();
            const result_banners = await bannersService.getBannerHome();
            const result_promotion_today = await productService.getPromotionToDay('1');
            const result_category = await categoryService.getCategory();
            const result_brand = await brandService.getBrandsByType('genuine');
            const result_typeFeatured = await typeService.getTypeFeatured('20');
            if (result_slider) {
                setSlider(result_slider);
            }
            if (result_banners) {
                setBanners(result_banners);
            }
            if (result_promotion_today) {
                setPromotionToDay(result_promotion_today);
            }
            if (result_category) {
                setCategory(result_category);
            }
            if (result_brand) {
                setBrandGenuine(result_brand);
            }
            if (result_typeFeatured) {
                setTypeFeatured(result_typeFeatured);
            }
        };
        fetchApi();
    }, []);
    const banner_top = banners.find((value) => {
        return value.name === 'banner_home_top';
    });
    return (
        <div className="wide grid">
            <div className={cx('home-wrapper')}>
                <TypeCarousel category={category} />
                <div
                    className={cx('home-top', {
                        'slider-top': true,
                        'sm-gutter': true,
                        row: true,
                    })}
                >
                    <div className={' col l-8 c-12 m-12'}>
                        <SliderCPN
                            settings={{
                                dots: true,
                                infinite: true,
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                autoplay: true,
                                speed: 600,
                                autoplaySpeed: 3000,
                                cssEase: 'linear',
                                responsive: [
                                    {
                                        breakpoint: 1024,
                                        settings: {
                                            slidesToShow: 1,
                                            slidesToScroll: 1,
                                            infinite: true,
                                            dots: true,
                                        },
                                    },
                                    {
                                        breakpoint: 600,
                                        settings: {
                                            slidesToShow: 1,
                                            slidesToScroll: 1,
                                            initialSlide: 1,
                                        },
                                    },
                                    {
                                        breakpoint: 480,
                                        settings: {
                                            slidesToShow: 1,
                                            slidesToScroll: 1,
                                        },
                                    },
                                ],
                            }}
                            slider={slider}
                        />
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
                                    {promotionToDay.length > 0 && (
                                        <Countdown
                                            end={promotionToDay[0].date_end}
                                            className={cx('countdown')}
                                        ></Countdown>
                                    )}
                                </div>

                                <Link className={cx('more')} to="/">
                                    View More
                                </Link>
                            </div>
                            <ProductCarousel products={promotionToDay} />
                        </div>
                    </div>
                    <div className="l-5 m-0">
                        <div className={cx('video-group')}>
                            <video className={cx('video-astra')} controls>
                                <source src={videos.astra} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>
                <div
                    className={cx('home-top', {
                        'sm-gutter': true,
                        row: true,
                    })}
                >
                    <div className="l-12 m-12 c-0">
                        <div className={cx('title-row')}>
                            <Image className={cx('title-image')} src={images.realBrand} />
                            <h2 className={cx('title-content')}>Genuine brand</h2>
                        </div>
                        <SliderCPN
                            settings={{
                                dots: true,
                                infinite: true,
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                autoplay: true,
                                speed: 600,
                                autoplaySpeed: 3000,
                                cssEase: 'linear',
                                appendDots: (dots) => (
                                    <div
                                        style={{
                                            backgroundColor: 'transparent',
                                            borderRadius: '10px',
                                            padding: '10px',
                                            bottom: '-40px',
                                        }}
                                    >
                                        <ul style={{ margin: '0px' }}> {dots} </ul>
                                    </div>
                                ),
                                customPaging: (i) => (
                                    <div
                                        className="dot-active-primary"
                                        style={{
                                            width: '10px',
                                            height: '10px',
                                            color: 'blue',
                                            backgroundColor: 'rgb(224, 224, 224)',
                                            borderRadius: '50%',
                                        }}
                                    ></div>
                                ),
                            }}
                            slider={slider}
                            classNameWrap={cx('fix-gutter')}
                            classNameItem={cx('gutter')}
                        ></SliderCPN>
                    </div>
                </div>

                <div
                    className={cx('home-top', {
                        'sm-gutter': true,
                        row: true,
                    })}
                >
                    <div className="l-12 m-12 c-12">
                        <BrandCarousel brands={brandGenuine}></BrandCarousel>
                    </div>
                </div>


                <div>
                    <div className={cx('title-row')}>
                        <h2 className={cx('title-content')}>Featured Category</h2>
                    </div>
                    <div className={'row'}>
                        {typeFeatured.map((type) => {
                            return (
                                <Link
                                    to={'/'}
                                    key={type.id_type}
                                    className={`col l-1-2 m-2-4 ${cx('type-featured__item')}`}
                                >
                                    <>
                                        <Image
                                            className={cx('type-featured__image')}
                                            src={`http://localhost:3001/images/types/${type.type_image}`}
                                        />
                                        <p className={cx('type-featured__name')}> {type.type_name}</p>
                                    </>
                                </Link>
                            );
                        })}
                    </div>
                </div>  
                <Suggestion />
                
            </div>
        </div>
    );
}
export default Home;
