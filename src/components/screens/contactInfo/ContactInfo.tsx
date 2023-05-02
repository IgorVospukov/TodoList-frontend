import { addFriend } from '@/store/slices/addFriendToUser';
import { useAppDispatch } from '../../../../hooks';
import Heading from '../../heading/Heading';

interface Props {
  id: string;
  name: string,
   surName: string,
    email: string;
    onClick: () => void;
}

const ContactInfo = ({id,name, surName, email}: Props) => {
  const dispatch = useAppDispatch();
  if(!id){
    return <Heading tag='h2' text='Not found' />
  }
  
  return (
    <>
    <Heading tag='h3' text='info' />
    <div>
      <p>Info:
        {`Email: ${email}, Name: ${name}, surName: ${surName}`}
        <button type='button' onClick={dispatch(addFriend({id, email}))}>add</button>
      </p>
    </div>
</>
  )
};

export default ContactInfo;