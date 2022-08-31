import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import styles from './SelectAddress.module.scss';

import * as administrativeService from '~/apiServices/administrativeService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function SelectAddress({ className }) {
    const [currentAddress, setCurrentAddress] = useState({
        city: '',
        district: '',
        village: '',
    });
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);

    const [cityInput, setCityInput] = useState('');
    const [districtInput, setDistrictInput] = useState('');
    const [villageInput, setVillageInput] = useState('');
    const cityRef = useRef();
    useEffect(() => {
        fetchApiCity();
    }, []);
    useEffect(() => {
        function handleClickOutside(e) {
            const controlElement = e.target.closest('.' + cx('control'));
            if (!controlElement){
                const controlElement = document.querySelectorAll('.' + cx('control'));
                controlElement.forEach((element) => {
                    element.classList.remove(cx('control--play'));
                });
            }
            else{

            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const fetchApiCity = async () => {
        const result = await administrativeService.getCity();
        if (result) {
            /* console.log(result); */
            setCities(result);
        }
    };

    const fetchApiDistrict = async (idCity) => {
        const result = await administrativeService.getDistrict(idCity);
        if (result) {
            console.log(result);
            setDistricts(result);
        }
    };
    const fetchApiVillage = async (idDistrict) => {
        const result = await administrativeService.getVillage(idDistrict);
        if (result) {
            console.log(result);
            setVillages(result);
        }
    };

    const handleCLickControl = (e) => {
        const controlElementCurrent = e.target.closest('.' + cx('control'));
        const controlElements = document.querySelectorAll('.' + cx('control'));
        controlElements.forEach((element) => {
            if(element !== controlElementCurrent){
                element.classList.remove(cx('control--play'));
            }
        });
        controlElementCurrent.classList.toggle(cx('control--play'));
    };
    const handleHideMenu = (e) => {
        const controlElement = e.target.closest('.' + cx('control'));
        controlElement.classList.remove(cx('control--play'));
    };

    const handleSelectMenuCity = (e) => {
        /* console.log(e.target.dataset.indexCity); */
        handleHideMenu(e);
        const indexCity = e.target.dataset.indexCity;
        if(indexCity){
            setCurrentAddress({city: cities[indexCity] });
            fetchApiDistrict(cities[indexCity].id_city);
            setVillages([])
        }
       
    };
    const handleSelectMenuDistrict = (e) => {
        /* console.log(e.target.dataset.indexCity); */
        handleHideMenu(e);
        const indexDistrict = e.target.dataset.indexDistrict;
        if(indexDistrict){
            setCurrentAddress({...currentAddress,village : '', district: districts[indexDistrict] });
            fetchApiVillage(districts[indexDistrict].id_district);
        }
       
    };
    const handleSelectMenuVillage = (e) => {
        /* console.log(e.target.dataset.indexCity); */
        handleHideMenu(e);
        const indexVillage = e.target.dataset.indexVillage;
        if(indexVillage){
            setCurrentAddress({...currentAddress, village: villages[indexVillage] });
        }
       
    };
    function removeAccents(str) {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    }
    let countAddress = 0;
    return (
        <div className={cx('wrapper', { [className]: true })}>
            <div className={cx('select-group')}>
                <label className={cx('title')}>Province/City</label>
                <div className={cx('control')}>
                    <div className={cx('search-box', 'active')} onClick={handleCLickControl}>
                        <div className={cx('input-group')}>
                            <div className={cx('view-label')}>
                                {currentAddress.city ? currentAddress.city.city_name : 'Please select city'}
                            </div>
                            <input
                                ref={cityRef}
                                className={cx('input')}
                                onChange={(e) => {
                                    const viewElement = e.target.parentElement.querySelector('.' + cx('view-label'));
                                    setCityInput(e.target.value);
                                    if (e.target.value !== '') {
                                        viewElement.style.display = 'none';
                                    } else {
                                        viewElement.style.display = 'block';
                                    }
                                }}
                            />
                        </div>

                        <FontAwesomeIcon className={cx('down-icon')} icon={faAngleDown} />
                    </div>
                    <div onClick={handleSelectMenuCity} className={cx('menu')}>
                        {cities.map((city, index) => {
                            if (
                                removeAccents(city.city_name)
                                    .toUpperCase()
                                    .indexOf(removeAccents(cityInput).toUpperCase()) !== -1
                            ) {
                                countAddress++;
                                return (
                                    <div key={index} data-index-city={index} className={cx('menu-item')}>
                                        {city.city_name}
                                    </div>
                                );
                            }
                        })}
                        {
                            countAddress <= 0 && <div className={cx('menu-item')}>No result search </div>
                        }
                        
                    </div>
                </div>
            </div>
            <div className={cx('select-group')}
               /*  onBlur = {handleHideMenu} */
            >
                <label className={cx('title')}>District</label>
                <div className={cx('control')}
                >
                    <div onClick={handleCLickControl} className={cx('search-box', districts.length > 0 && 'active')}>
                    <div className={cx('input-group')}>
                            <div className={cx('view-label')}>
                                {currentAddress.district? currentAddress.district.district_name : 'Please select district'}
                            </div>
                            <input
                                ref={cityRef}
                                className={cx('input')}
                                onChange={(e) => {
                                    const viewElement = e.target.parentElement.querySelector('.' + cx('view-label'));
                                    setDistrictInput(e.target.value);
                                    if (e.target.value !== '') {
                                        viewElement.style.display = 'none';
                                    } else {
                                        viewElement.style.display = 'block';
                                    }
                                }}
                            />
                        </div>
                        <FontAwesomeIcon className={cx('down-icon')} icon={faAngleDown} />
                    </div>
                    <div onClick={handleSelectMenuDistrict} className={cx('menu')}>
                        {districts.map((district, index) => {
                            if (
                                removeAccents(district.district_name)
                                    .toUpperCase()
                                    .indexOf(removeAccents(districtInput).toUpperCase()) !== -1
                            ) {
                                countAddress++;
                                return (
                                    <div key={index} data-index-district={index} className={cx('menu-item')}>
                                        {district.district_name}
                                    </div>
                                );
                            }
                        })}
                        {
                            countAddress <= 0 && <div className={cx('menu-item')}>No result search </div>
                        }
                        
                    </div>
                </div>
            </div>

            <div className={cx('select-group')}>
                <label className={cx('title')}>Village</label>
                <div className={cx('control')}>
                    <div onClick={handleCLickControl} className={cx('search-box', villages.length > 0 && 'active')}>
                    <div className={cx('input-group')}>
                            <div className={cx('view-label')}>
                                {currentAddress.village? currentAddress.village.village_name : 'Please select village'}
                            </div>
                            <input
                                ref={cityRef}
                                className={cx('input')}
                                onChange={(e) => {
                                    const viewElement = e.target.parentElement.querySelector('.' + cx('view-label'));
                                    setVillageInput(e.target.value);
                                    if (e.target.value !== '') {
                                        viewElement.style.display = 'none';
                                    } else {
                                        viewElement.style.display = 'block';
                                    }
                                }}
                            />
                        </div>
                        <FontAwesomeIcon className={cx('down-icon')} icon={faAngleDown} />
                    </div>
                    <div onClick={handleSelectMenuVillage} className={cx('menu')}>
                        {villages.map((village, index) => {
                            if (
                                removeAccents(village.village_name)
                                    .toUpperCase()
                                    .indexOf(removeAccents(villageInput).toUpperCase()) !== -1
                            ) {
                                countAddress++;
                                return (
                                    <div key={index} data-index-village={index} className={cx('menu-item')}>
                                        {village.village_name}
                                    </div>
                                );
                            }
                        })}
                        {
                            countAddress <= 0 && <div className={cx('menu-item')}>No result search </div>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SelectAddress;
