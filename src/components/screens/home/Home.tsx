
import { FC, useEffect, useState } from 'react'
import styles from './Home.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { getFriends } from '@/store/slices/getUsersFriends';
import { getTodos } from '@/store/slices/getUserTodos';
import { createTodo } from '@/store/slices/createUserTodo';
import Link from 'next/link';


const Home: FC = () => {
  const dispatch = useAppDispatch();
  const dataFriends = useAppSelector( store => store.getUsersFriends.currentUser);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const token = useAppSelector( store => store.authIsUserLogin.currentToken);

  useEffect(() => {
    dispatch(getFriends(token));
  },[]);

  const descriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  }

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.friends}>
        <p>
          {dataFriends?.name}
        </p>
        <ul>
          {dataFriends && dataFriends.friends.map((item) => <li key={item.email}>
            <Link href={`/todos/${item.id}`}>{item.email}</Link>
          </li>)}
        </ul>
      </div>
      <div className={styles.todo}>
        <div  className={styles.inputsTodo}>
         <input type='text' onChange={(e) => titleHandler(e)}/>
         <input type='text' onChange={(e) => descriptionHandler(e)}/>
        <button type ='button' onClick={() => dispatch(createTodo({title, description, token}))}>
          <span>
            add todo
            </span>
        </button>
        </div>
          <p>Todo</p>
        </div>
    </div>
  )
}

export default Home;