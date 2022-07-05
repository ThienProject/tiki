import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import styles from './TypeCarousel.Module.scss';
const cx = classNames.bind(styles);
function TypeCarousel({ category }) {
    const carouselRef = useRef();
    const btnPrevRef = useRef();
    const btnNextRef = useRef();
    console.log("reder...")
    return (
        <div className={cx('type-carousel')}>
            <button
                ref={btnPrevRef}
                className={cx('btn-prev')}
                onClick={(e) => {
                    const Width = carouselRef.current.offsetWidth - 100;
                    //console.log( "left" +carouselRef.current.scrollLeft)
                    //console.log("width"+Width)
                    carouselRef.current.scrollTo({
                        left: carouselRef.current.scrollLeft - Width,
                        top: 0,
                        behavior: 'smooth',
                    });
                    console.log(carouselRef.current.scrollLeft - Width);
                    if (carouselRef.current.scrollLeft - Width <= 0) {
                        btnPrevRef.current.classList.remove(cx('active'));
                    }
                    //
                    btnNextRef.current.classList.add(cx('active'));
                }}
            >
                <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <div ref={carouselRef} className={cx('content')}>
                {category.map((type, index) => {
                    return (
                        <Link
                            className={cx('type-item')}
                            key={index}
                            to={slugify(type.name, {
                                replacement: '-', // replace spaces with replacement character, defaults to `-`
                                remove: undefined, // remove characters that match regex, defaults to `undefined`
                                lower: true, // convert to lower case, defaults to `false`
                                strict: true, // strip special characters except replacement, defaults to `false`
                                locale: 'vi', // language code of the locale to use
                                trim: true, // trim leading and trailing replacement chars, defaults to `true`
                            })}
                        >
                            {type.name}
                        </Link>
                    );
                })}
            </div>
            <button
                ref={btnNextRef}
                className={cx('btn-next', 'active')}
                onClick={(e) => {
                    const Width = carouselRef.current.offsetWidth - 100;
                    carouselRef.current.scrollTo({
                        left: carouselRef.current.scrollLeft + Width,
                        top: 0,
                        behavior: 'smooth',
                        duration: 500,
                        easing: 'easeInOutQuad'
                    });
                    console.log([carouselRef.current]);
                    if (carouselRef.current.scrollWidth - (carouselRef.current.scrollLeft + 2 * Width) <= 0) {
                        btnNextRef.current.classList.remove(cx('active'));
                    }
                    //
                    console.log(
                        carouselRef.current.scrollWidth -
                            (carouselRef.current.scrollLeft + carouselRef.current.offsetWidth),
                    );
                    //console.log(widthContent)
                    btnPrevRef.current.classList.add(cx('active'));
                }}
            >
                <FontAwesomeIcon icon={faAngleRight} />
            </button>
        </div>
    );
}
export default TypeCarousel;
