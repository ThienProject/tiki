import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import * as typeService from '~/apiServices/typesService';
import styles from './TypeFeatured.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);
function TypeFeatured() {
    const [typeFeatured, setTypeFeatured] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result_typeFeatured = await typeService.getTypeFeatured('20');

            if (result_typeFeatured) {
                setTypeFeatured(result_typeFeatured);
            }
        };
        fetchApi();
    }, []);

    return (
        <>
            {typeFeatured.map((type) => {
                return (
                    <Link to={'/'} key={type.id_type} className={`col l-1-2 m-2-4 ${cx('type-featured__item')}`}>
                        <>
                            <Image
                                className={cx('type-featured__image')}
                                src={`http://localhost:3001/images/types/${type.type_image}`}
                            />
                            <p className={cx('type-featured__name')}> {type.type_name}</p>
                        </>
                    </Link>
                );
            })}{' '}
        </>
    );
}
export default TypeFeatured;
