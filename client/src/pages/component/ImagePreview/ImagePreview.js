import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import styles from './ImagePreview.module.scss';

const cx = classNames.bind(styles);
function ImagePreview({images}) {
    const [imageCurrent, setImageCurrent] = useState('');

    function handlePreview(e) {
        const imgThumbnails = document.querySelectorAll(`.${cx('thumbnail-item')} img`);
        imgThumbnails.forEach((img) => img.classList.remove(cx('active')));
        e.target.classList.add(cx('active'));
        setImageCurrent(e.target.src);
    }
    return (<div>
        <div className={cx('product__img-group')}>
            <div className={cx('preview')}>
                {
                    <div className={cx('preview-item')}>
                        <img
                            alt=""
                            src={
                                imageCurrent !== ''
                                    ? imageCurrent
                                    : images[0].image_link
                            }
                        ></img>
                    </div>
                }
            </div>

            <div className={cx('thumbnail-list')}>
                {images.map(
                    (img, index) =>
                        index < 5 && (
                            <div key={index} className={cx('thumbnail-item')}>
                                <img
                                    className={index === 0 ? cx('active') : ''}
                                    data-index={index}
                                    onClick={handlePreview}
                                    alt={img.image_name}
                                    src={img.image_link}
                                ></img>
                            </div>
                        ),
                )}

                {images.length > 6 && (
                    <div className={cx('thumbnail-item', 'thumbnail-item--more')}>
                        <div>
                            <img
                                onClick={handlePreview}
                                alt={images[5].image_name}
                                src={images[5].image_link}
                            ></img>
                        </div>

                        <span className={cx('thumbnail-item__span')}>
                            view more {images.length - 5} images
                        </span>
                    </div>
                )}
            </div>
        </div>
    </div>)
}
export default ImagePreview;