import { useState, FC } from 'react';
import styles from './Registartion.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { registerUser } from '@/store/slices/signUpUser'; 
import { useRouter } from 'next/router';



const RegistrationForm: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const dataUser = useAppSelector( store => store.signUpUser.currentUser)
  console.log("dataUser from Registartion", dataUser);
  
  const [name, setName] = useState('');
  const [surName, setSurName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
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

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const userData = {
      name: name,
      surName: surName,
      email: email,
      password: password
    };
    dispatch(registerUser(userData));
    router.push('/login');
  };

  return (
    <form className={styles.registrationForm}>
      <label>
        Имя:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label>
        Фамилия:
        <input type="text" value={surName} onChange={(event) => setSurName(event.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={emailHandler} />
      </label>
      <label>
        Пароль:
        <input type="password" value={password} onChange={passHandler} />
      </label>
      <button type="button" onClick={handleSubmit}>Sign up</button>
    </form>
  );
}

export default RegistrationForm;
