import styles from './Login.module.scss'
import classNames from 'classnames/bind'
import { useState } from 'react';
import Button from '../Button';

const cx = classNames.bind(styles);
function EnterPass({handleLogin, phone, loginFormRef, classModifier }) {
    const [password, setPassword] = useState('');
    const { setAuth } = useAuth();
    const handleLoginClick = async () => {
        //check password
      const result = await handleLogin({phone: phone,password: password});
      console.log(result);
      //console.log(result.user_name);
      if(result.user_name) {
        loginFormRef.current.classList.remove(classModifier);
        loginFormRef.current.querySelector('span').innerText = result.user_name;
        const accessToken = result?.token;
        const roles = result?.id_permission;
        setAuth({ ...result.user, roles, accessToken});
      }
     
    }
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
                <Button className={cx('btn-login')} red size='large' 
                    onClick={handleLoginClick}
                >
                    Login</Button>

                <div className={cx('bottom')}>
                    <span className={cx('bottom-forget')}><a>Forget Password</a></span>
                   
                </div>

            </div>

        </div>
    )
}
export default EnterPass

