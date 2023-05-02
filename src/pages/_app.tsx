import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '@/store';
import Auth from '@/components/layout/Auth';
import Common from '@/components/layout/Common';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Auth>
        <Common>
          <main>
          <Component {...pageProps} />        
          </main>
        </Common>
      </Auth> 


    </Provider>
  );
}

export default App;
