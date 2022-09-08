import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import styles from './DisplayAddress.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import images from '~/assets/images';
import * as userService from '~/apiServices/usersService';
import SelectAddress from '../SelectAddress';
const cx = classNames.bind(styles);

function DisplayAddress() {
    const [address, setAddress] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const resultAddress = await userService.getAddress(14);
            if (resultAddress) {
                setAddress(resultAddress);
            }
        };
        fetchApi();
    }, []);
    const handleCloseAddress = (e) => {
        const addressElement = e.target.closest('.' + cx('address'));
        const addressBox = e.target.closest('.' + cx('address--select'));
        const currentAddress = e.target.closest('.' + cx('current-address'));
        if ((!addressBox && !currentAddress) || e.target.matches('.' + cx('close'))) {
            console.log(addressElement);
            addressElement.classList.remove(cx('address--active'));
        }
    };

    return (
        <div className={cx('address')}>
        <div
            className={cx('current-address')}
            onClick={(e) => {
                const eL = e.target.closest('.' + cx('address'));
                const classN = cx('address--active');
                if (classN) {
                    eL.classList.add(classN);
                }
            }}
        >
            {address.length > 0 ? (
                <p>
                    Ship to{' '}
                    <strong>
                        {address[0].detail_address},{' '}
                        {address[0].village_name},{' '}
                        {address[0].district_name},{' '}
                        {address[0].city_name}{' '}
                    </strong>{' '}
                    - <span>Change address</span>{' '}
                </p>
            ) : (
                <p>
                    Please{' '}
                    <strong> enter your delivery address </strong>{' '}
                    to receive the most accurate delivery time &
                    cost forecast.
                </p>
            )}
        </div>

        {address && (
            <div className={cx('overlay')}
                onClick={handleCloseAddress}
            >
                <div className={cx('address--select')}>
                    <FontAwesomeIcon
                        onClick={handleCloseAddress}
                        className={cx('close')}
                        icon={faTimes}
                    />
                    <p className={cx('overlay-title')}>
                        Delivery address
                    </p>
                    <p className={cx('overlay-description')}>
                        Please select the delivery address to
                        receive the most accurate forecast of
                        delivery time and packaging and shipping
                        fees{' '}
                    </p>
                    <div className={cx('list-address')}>
                        {address.map((add, index) => {
                            return (
                                <div
                                    className={cx('address-item')}
                                    key={index}
                                >
                                    <input
                                        type="radio"
                                        name="address"
                                        id={add.id_address}
                                    />
                                    <span
                                        className={cx(
                                            'checked-icon',
                                        )}
                                    ></span>
                                    <label
                                        htmlFor={add.id_address}
                                    >{`${add.detail_address}, ${add.village_name}, ${add.district_name}, ${add.city_name}`}</label>
                                </div>
                            );
                        })}
                        <div className={cx('address-item')}>
                            <input
                                type="radio"
                                name="address"
                                id={cx('more-select')}
                            />
                            <span
                                className={cx('checked-icon')}
                            ></span>
                            <label htmlFor="more-select">
                                Select other area
                            </label>
                            <SelectAddress className={cx('address-another')} />
                        </div>
                    </div>
                    <Button
                        className={cx('btn-select-address')}
                        red
                        size="large"
                    >
                        SHIP TO THIS ADDRESS
                    </Button>
                </div>
            </div>
        )}
        <div className={cx('delivery-charges')}>
            <div className={cx('transport-top')}>
                <img className={cx('transport-img')} alt='' src={images.tikiFast} />
                <p className={cx('transport-date')}>Friday 31/8/2022</p>

            </div>
            <div className={cx("transport-fee")}>
                22.000đ
            </div>


        </div>
    </div>
    );
}
export default DisplayAddress;