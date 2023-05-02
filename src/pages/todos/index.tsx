import Heading from "@/components/heading/Heading";
import Head from "next/head";
import Link from 'next/link';


const Todos = ({ allTodos }) => {
  console.log("from contacts allTodos", allTodos);
  
  return (
    <>
    <Head><title>Todos</title>
    </Head>
    <Heading tag='h5' text='Todos List' />
    <ul>
      {allTodos?.map(({_id, name, email}) => (
        <li key={_id}>
          <Link href={`/todos/${_id}`}>{email}</Link>
        </li>
      ))}
    </ul>
</>
  )
};

export default Todos;

export const getStaticProps = async () => {
  const response = await fetch('http://localhost:5000/todos/mytodos');
  const allTodos = await response.json();
  if (!allTodos) {
    return {
      notFound: true,
    }

  };
  return {
    props: {
      allTodos
    },
  }
}