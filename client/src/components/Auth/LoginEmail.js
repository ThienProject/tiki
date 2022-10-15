import styles from './Login.module.scss'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react';
import Button from '../Button';
import { login } from './authSlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

const cx = classNames.bind(styles);
function LoginEmail({fn}) {
    const [emailValue, setEmailValue] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const handleLoginBtn = async(e) => { 
        try {
            const action = login({ email: emailValue, password: password });
            console.log({ action });
            const actionResult  = await dispatch(action);
            const currentValue = unwrapResult(actionResult);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className={cx('content-action')}>
            <div className={cx('content-action-top')}>
                <h1 className={cx('title')}>Login with Email</h1>
                <p className={cx('sub-title')}>Enter email and password of tiki account</p>
                <input
                    className={cx('input', 'input-email')}
                    value={emailValue}
                    placeholder={'Email'}
                    onChange={
                        (e) => {
                            setEmailValue(e.target.value)
                        }
                    }
                />
                <input
                    className={cx('input', 'input-email')}
                    value={password}
                    type='password'
                    placeholder={'Password'}
                    onChange={
                        (e) => { setPassword(e.target.value) }
                    }
                />
                <Button onClick={handleLoginBtn} className={cx('btn-login')} red size='large' >Login</Button>

                <div className={cx('bottom')}>
                    <span className={cx('bottom-forget')}><p>Forget Password</p> </span>
                    <span className={cx('bottom-new-account')}>No account? <p onClick={()=>{
                        fn('Phone');
                    }}> Create an account</p></span>
                </div>

            </div>

        </div>
    )
}
export default LoginEmail

