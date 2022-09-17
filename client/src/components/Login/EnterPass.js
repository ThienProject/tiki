import styles from './Login.module.scss'
import classNames from 'classnames/bind'
import { useState } from 'react';
import Button from '../Button';

const cx = classNames.bind(styles);
function EnterPass({phone}) {
    const [password, setPassword] = useState('');
    return (
        <div className={cx('content-action')}>
            <div className={cx('content-action-top')}>
                <h1 className={cx('title')}>Enter Password</h1>
                <p className={cx('sub-title')}>Please enter password of num phone <strong>{phone}</strong></p>
               
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
                   
                </div>

            </div>

        </div>
    )
}
export default EnterPass

