import { useState, useEffect } from 'react';

import * as bannersService from '~/apiServices/BannersService';
import Slider from '~/pages/component/Slider';


function SliderTop(){
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

    return  <Slider
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
}
export default SliderTop