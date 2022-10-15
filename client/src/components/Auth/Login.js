import styles from './Login.module.scss'
import classNames from 'classnames/bind'
import { useRef, useState } from 'react';
import images from '~/assets/images';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import LoginEmail from './LoginEmail';
import EnterPass from './EnterPass';
import * as usersService from '~/apiServices/usersService'
import Register from './Register';
const cx = classNames.bind(styles);
function Login({ contentFormRef, loginFormRef, classModifier, className }) {
    const [phone, setPhone] = useState('');
    const [loginType, setLoginType] = useState('Phone');    

    const errorRef = useRef();
    const handleLogin = async (params)=>{
        const result = await usersService.login(params);
        // console.log(result);
        return result;
    }
    const handleLoginWithPhone = (e)=>{
        // console.log(errorRef.current)
        // console.log(errorRef.current.innerHTML)
        if(!phone.length === 10 ||  phone < 1 || !phone.startsWith('0')){
            errorRef.current.innerHTML= "Phone is invalid"
        }
        else{
          const callAPI = async ()=>{
            const result = await handleLogin({'phone': phone, 'password': ''});
            if(result === 'no_account'){
                console.log(result);
            }
            if(result == 'false'){
                setLoginType('password');
            }
            else{
               // const
               setLoginType('register');
               // 
            }
        }
         callAPI();
        }
        
    }
    function fn(value){
        setLoginType(value)
    }
    return (
        <div className={cx('wrapper', className)}>
            <div ref={contentFormRef} className={cx('content')}>
                {
                    loginType === 'Phone' ?
                        <div className={cx('content-action')}>
                            <div className={cx('content-action-top')}>
                                <h1 className={cx('title')}>Hello</h1>
                                <p className={cx('sub-title')}>Login or Register</p>
                                <input
                                    required
                                    className={cx('input')}
                                    value={phone}
                                    placeholder={'Phone Number'}
                                    onChange={
                                        (e) => { 
                                            errorRef.current.innerHTML= ""
                                            setPhone(e.target.value) 
                                        }
                                    }
                                />
                                <span ref = {errorRef} className={cx('error-mess')}></span>
                                <Button 
                                    className={cx('btn-login')}
                                    onClick = {handleLoginWithPhone}
                                     red size='large' >Continue</Button>
                                <span
                                    className={cx('change-login')}
                                    onClick={() => {
                                        setLoginType('Email');
                                    }}
                                >Login with email</span>
                            </div>
                            <div className={cx('break')}>
                                <span > Or continue with</span>
                            </div>
                            <div className={cx('content-action-bottom')}>
                                <div className={cx('login-another')}>
                                    <img src={images.facebook} alt={'facebook'} />
                                    <img src={images.google} alt={'google'} />
                                </div>
                            </div>

                        </div>
                        :
                            <div>
                                <span
                                    onClick={()=>{
                                        setLoginType('Phone');
                                    }}
                                    className={cx('back-btn')}><FontAwesomeIcon icon={faArrowLeft} />
                                </span>
                                    {
                                        loginType === 'Email' ? 
                                            <LoginEmail fn={fn} handleLogin = {handleLogin} loginFormRef = {loginFormRef}/> 
                                            : 
                                            loginType === 'register' ? 
                                                <Register phone ={phone} />
                                                :
                                                <EnterPass handleLogin = {handleLogin}  phone={phone} loginFormRef = {loginFormRef} classModifier = {classModifier} />
                                    }
                                
                            </div>

                }

                <div className={cx('content-view')}>
                    <img className={cx('login-img')} src={images.login} alt={"banner-login"} />
                    <div className={cx('login-slogan')}>
                        <p><strong> Shopping at Tiki </strong></p>
                        <p>Super deals every day</p>
                    </div>

                </div>
                <button
                    className={cx('btn-close')}
                    onClick={(e) => {
                        loginFormRef.current.classList.remove(classModifier);
                    }}
                ><FontAwesomeIcon icon={faTimes} /></button>
            </div>
        </div>
    )
}
export default Login