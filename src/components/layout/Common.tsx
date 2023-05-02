import Header from '../header/Header';
import Footer from '../footer/Footer';


type Props = {
  children: React.Component
}

const Common = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children} 
      <Footer /> 
    </>
  )
};

export default Common;