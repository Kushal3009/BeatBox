import React, { useEffect } from 'react';

const Alert = ({ type, message, onClose }) => {
  const alertClass = type === 'success' ? 'alert-success' : type === 'error' ? 'alert-danger' : 'alert-warning';

  useEffect(() => {
    // Automatically dismiss the alert after 2 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`alert ${alertClass} alert-dismissible fade show text-center w-25 m-auto`} role="alert">
      {message}
    </div>
  );
};

export default Alert;

