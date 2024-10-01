import React from 'react';
// import styles from './Alert.module.less';

interface AlertProps {
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  return (
    // <div className={`${styles.alert} ${styles[type]}`}>
    //   {message}
    // </div>
    <div >
    {message}
  </div>
  );
};

export default Alert;