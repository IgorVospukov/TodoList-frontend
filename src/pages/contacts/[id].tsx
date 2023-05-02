import Head from "next/head";
import ContactInfo from "@/components/screens/contactInfo/ContactInfo";


const Contact = ({ User }) => {
  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <ContactInfo User={User}/>
    </>
  )
}

export default Contact;
export const getServerSideProps = async (context) => {
  console.log('contexxt', context);
  const {id, email} = context.params;
  console.log('z bp [id] contexxt', email);
  const response = await fetch(`http://localhost:5000/user/friend/${id}/${email}`);
  const User = await response.json();
  if (!User) {
    return {
      notFound: true,
    }

  };
  return {
    props: {
      User
    },
  }
}