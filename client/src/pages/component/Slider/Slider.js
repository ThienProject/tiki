import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
import "./Slider.scss"
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css"

import * as bannersService from'~/apiServices/BannersService'
const cx = classNames.bind(styles);
function Slide({slider}){

        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            speed: 600,
            autoplaySpeed: 3000,
            cssEase: "linear",
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  initialSlide: 1
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
        };
        
        
        return (
            <div className={cx('wrapper')}>
                <Slider {...settings}>
                  {
                    slider.map((item)=>{
                      return <div key={item.id}>
                        <img className={cx('img-slider__top')} alt={item.name} src= {`http://localhost:3001/images/banners/${item.image}`} />
                      </div>
                    })
                  }
                </Slider>
            </div>
          );
     
}
export default Slide