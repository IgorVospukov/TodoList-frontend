'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { loginUser } from '@/store/slices/authIsUserLogin';
import { isUserRegister } from '@/store/slices/checkUserIsRegistered';



const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.authIsUserLogin.currentToken);

  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [valid, setValid] = useState(false);



  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
    const re =
      /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Wrong Email');
    } else {
      setEmailError('');
    }
  };

  const passHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3) {
      setPasswordError('Wrong Password');
    } else {
      setPasswordError('');
    }
  };

  const isLogin = () => {
    if (emailError || passwordError) {
      setValid(false);
    } else {
      setValid(true);
      dispatch(isUserRegister({email, password}));
      dispatch(loginUser({email, password}));
      router.push('/');
    }
  };

  return (
    <div className={styles.login}>
      <form>
        <div className={styles.image}>
          {emailError && <div className={styles.forMail}>{emailError}</div>}          
        </div>
        <input
          className={styles.mail}
          value={email}
          onChange={(e) => emailHandler(e)}
          name='email'
          type='text'
          placeholder='Enter your email'
        />
        {passwordError && <div className={styles.forPassword}>{passwordError}</div>}
        <input
          className={styles.pass}
          value={password}
          onChange={(e) => passHandler(e)}
          name='password'
          type='password'
          placeholder='Password'
        />
        <button type='button' onClick={isLogin}>Log in</button>
        <button type='button' onClick={() =>  router.push('/registration')}>Sign up</button>
      </form>
    </div>
  );
};

export default Login;
