import React from 'react';
// import styles from './Button.module.less';

interface ButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label }) => {
  // return <button className={styles.button}>{label}</button>;
  return <button >{label}</button>;
};

export default Button;