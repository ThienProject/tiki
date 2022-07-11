import classNames from 'classnames/bind';

import Image from '~/components/Image';
import images from '~/assets/images';
import styles from './Home.module.scss';
import CategoryCarousel from './component/CategoryCarousel';
import videos from '~/assets/videos';
import Suggestion from '../component/Suggestion';
import SliderTop from './component/SliderTop';
import SliderMiddle from './component/SliderMiddle';
import BannerTop from './component/BannerTop';
import PromotionToday from './component/PromotionToday';
import BrandGenuine from './component/BrandGenuine';
import TypeFeatured from './component/TypeFeatured';

const cx = classNames.bind(styles);
function Home() {
    console.log('render home....');
    /* */

    return (
        <div className="wide grid">
            <div className={cx('home-wrapper')}>
                <CategoryCarousel />
                <div
                    className={cx('home-top', {
                        'slider-top': true,
                        'sm-gutter': true,
                        row: true,
                    })}
                >
                    <div className={'col l-8 c-12 m-12'}>
                        <SliderTop />
                    </div>
                    <div className={'col l-4 c-0 m-0'}>
                        <BannerTop />
                    </div>
                </div>
                <div
                    className={cx('home-top', {
                        'sm-gutter': true,
                        row: true,
                    })}
                >
                    <div className="l-7 m-12">
                        <PromotionToday />
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
                        <SliderMiddle />
                    </div>
                </div>

                <div
                    className={cx('home-top', {
                        'sm-gutter': true,
                        row: true,
                    })}
                >
                    <div className="l-12 m-12 c-12">
                        <BrandGenuine />
                    </div>
                </div>

                <div>
                    <div className={cx('title-row')}>
                        <h2 className={cx('title-content')}>Featured Category</h2>
                    </div>
                    <div className={'row'}>
                        <TypeFeatured />
                    </div>
                </div>
                <Suggestion />
            </div>
        </div>
    );
}
export default Home;
