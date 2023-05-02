import Heading from '@/components/heading/Heading';
import Head from 'next/head';
import Link from 'next/link';


const Contacts = ({allUsers}) => {
  console.log('from contacts allUsers', allUsers);
  
  return (
    <>
    <Head><title>Contacts</title>
    </Head>
    <Heading tag='h2' text='Contacts List' />
    <ul>
      {allUsers?.map(({_id, name, email}) => (
        <li key={_id}>
          <Link href={`/contacts/${_id}/${email}`}>{email}</Link>
        </li>
      ))}
    </ul>
</>
  )
};

export default Contacts;

export const getStaticProps = async () => {
  const response = await fetch('http://localhost:5000/user/allusers');
  const allUsers = await response.json();
  if (!allUsers) {
    return {
      notFound: true,
    }

  };
  return {
    props: {
      allUsers
    },
    revalidate: 100,
  }
}