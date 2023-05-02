import { addFriend } from '@/store/slices/addFriendToUser';
import { useAppDispatch } from '../../../../hooks';
import Heading from '../../heading/Heading';

interface Props {
  id: string;
  title: string,
  descrition: string,
}

const TodoInfo = ({ id,title, descrition }: Props) => {
  if(!id){
    return <Heading tag='h2' text='Not found' />
  }
  
  return (
    <>
    <Heading tag='h3' text='info' />
    <div>
      <p>Info:
        {`Title: ${title}, Description: ${descrition}`}
      </p>
    </div>
</>
  )
};

export default TodoInfo;