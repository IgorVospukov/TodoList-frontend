import Head from 'next/head';
import TodoInfo from '@/components/screens/todoInfo/TodoInfo';


const Todos = ({ Todos }) => {
  return (
    <>
      <Head>
        <title>TodoInfo</title>
      </Head>
      <TodoInfo Todos={Todos}/>
    </>
  )
}

export default Todos;
export const getServerSideProps = async (context) => {
  console.log('contexxt', context);
  const {id, email} = context.params;
  console.log('z bp [id] contexxt', email);
  const response = await fetch(`http://localhost:5000/todos/${id}`);
  const Todos = await response.json();
  if (!Todos) {
    return {
      notFound: true,
    }

  };
  return {
    props: {
      Todos
    },
  }
}