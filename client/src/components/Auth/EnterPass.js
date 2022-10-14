import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import Button from '../Button';
import { useDispatch } from 'react-redux';
import { login } from './authSlice';
import { unwrapResult } from '@reduxjs/toolkit';
const cx = classNames.bind(styles);
function EnterPass({ handleLogin, phone }) {
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const handleLoginClick = async () => {
        //check password
        const result = await handleLogin({ phone: phone, password: password });
        console.log(result);
        //console.log(result.fullname);
        if (result.user) {
            // const roles = result?.id_permission;
            // const action = login({token, user});
            try {
                const action = await login({ phone: phone, password: password });
                console.log({ action });
                const actionResult  = await dispatch(action);
                const currentValue = unwrapResult(actionResult);
            } catch (error) {
                console.error(error);
            }
           
           
        }
    };
    return (
        <div className={cx('content-action')}>
            <div className={cx('content-action-top')}>
                <h1 className={cx('title')}>Enter Password</h1>
                <p className={cx('sub-title')}>
                    Please enter password of num phone <strong>{phone}</strong>
                </p>
                <input
                    className={cx('input', 'input-email')}
                    value={password}
                    type="password"
                    placeholder={'Password'}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <Button className={cx('btn-login')} red size="large" onClick={handleLoginClick}>
                    Login
                </Button>

                <div className={cx('bottom')}>
                    <span className={cx('bottom-forget')}>
                        <a href="/">Forget Password</a>
                    </span>
                </div>
            </div>
        </div>
    );
}
export default EnterPass;
