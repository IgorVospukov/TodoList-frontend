import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useEffect, useLayoutEffect } from 'react';
import Login from '../screens/login/Login';


type Props = {
  children: React.Component
}

const Auth = ({ children }: Props) => {
  const router = useRouter();
  const {pathname} = useRouter();
  const auth = useAppSelector(state => state.authIsUserLogin.currentToken);
   

  useEffect(() => {
    if(pathname === '/registration'){
      return;
    };
    
  }, [router, pathname]);

  return (
    <>
    {!auth ? <Login />: <>{children}</> }       
    </>
  )
};

export default Auth;