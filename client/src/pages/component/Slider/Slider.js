import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import "./Slider.scss";
const cx = classNames.bind(styles);
function Slide({slider, settings, classNameWrap,classNameItem }){
        return (
            <div className={cx(`wrapper ${classNameWrap}`)}>
                <Slider {...settings}>
                  {
                    slider.map((item, index)=>{
                      return <div key={index} className = {cx(classNameItem)}>
                        <img className={cx('img-slider__top')} alt={item.name} src= {`http://localhost:3001/images/banners/${item.image}`} />
                      </div>
                    })
                  }
                </Slider>
            </div>
          );
     
}
export default Slide