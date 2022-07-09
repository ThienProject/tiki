import styles from './BrandCarousel.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import classNames from 'classnames/bind';
import './Slider.scss';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import images from '~/assets/images';
const cx = classNames.bind(styles);
function ProductCarousel({ brands = [] }) {
        //console.log(brands)

    // "$1,000.00"

    return (
        <div className="brand-carousel">
            <Slider infinite={false} initialSlide={0} slidesToShow={6} slidesToScroll={6} speed={500}>
                {brands.map((brand, index) => {
                   
                    return (
                        <div key={index} className={cx('brand')}>
                            <Link className={cx('brand-link')} to={'/'}>
                                <Image
                                    className={cx('brand_image')}
                                    alt={brand.image_name}
                                    src={`http://localhost:3001/images/brands/${brand.brand_image}`}
                                />  
                            </Link>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}
export default ProductCarousel;
