import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';

import styles from './Login.module.scss';
import Button from '../Button';
import { login } from './authSlice';
import * as userService from '~/apiServices/usersService';

const cx = classNames.bind(styles);
function Register({ phone }) {
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const handleRegisterBtn = async (e) => {
        try {
            const result = await userService.register({phone, fullname, password});
            const action = await login({ phone: phone, password: password });
            const actionResult  = await dispatch(action);
            unwrapResult(actionResult);
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className={cx('content-action')}>
            <div className={cx('content-action-top')}>
                <h1 className={cx('title')}>Create account</h1>
                <form className={cx('form-group')}>
                    <div className={cx('form-item')}>
                        <p className={cx('sub-title')}>Please enter your name</p>
                        <input
                            className={cx('input', 'input-fullname')}
                            value={fullname}
                            placeholder={'Full name'}
                            onChange={(e) => {
                                setFullname(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('form-item')}>
                        <p className={cx('sub-title')}>Create password</p>
                        <input
                            className={cx('input', 'input-fullname')}
                            value={password}
                            type="password"
                            placeholder={'Password'}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                </form>

                <Button onClick={handleRegisterBtn} className={cx('btn-login')} red size="large">
                    Create account
                </Button>
            </div>
        </div>
    );
}

Register.propTypes = {
    phone : PropTypes.string.isRequired
}
export default Register;
