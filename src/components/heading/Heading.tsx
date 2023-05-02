import styles from './Heading.module.scss';

const Heading = ({ tag, text }) => {
  const Tag = tag || 'h1';
  return (
    <Tag className={styles.heading}>{text}</Tag>
  )
}

export default Heading;