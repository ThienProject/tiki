import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import * as bannersService from '~/apiServices/BannersService';
import Slider from '~/pages/component/Slider';
import styles from './SliderMiddle.module.scss';

const cx = classNames.bind(styles);
function SliderMiddle(){
    const [slider, setSlider] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result_slider = await bannersService.getSliderHomeTop();
            if (result_slider) {
                setSlider(result_slider);
            }
           
        };
        fetchApi();
    }, []);

    return   <Slider
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
    classNameItem={cx('gutter')} />
}
export default SliderMiddle