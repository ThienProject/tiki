import styles from './Login.module.scss'
import classNames from 'classnames/bind'
import { useState } from 'react';
import Button from '../Button';
import { unmountComponentAtNode } from 'react-dom';

const cx = classNames.bind(styles);
function LoginEmail({fn}) {
    const [emailValue, setEmailValue] = useState('');
    const [password, setPassword] = useState('');
  
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
                <Button className={cx('btn-login')} red size='large' >Login</Button>

                <div className={cx('bottom')}>
                    <span className={cx('bottom-forget')}><a>Forget Password</a></span>
                    <span className={cx('bottom-new-account')}>No account? <a onClick={()=>{
                        fn('Phone');
                    }}> Create an account</a></span>
                </div>

            </div>

        </div>
    )
}
export default LoginEmail

