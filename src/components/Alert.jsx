// src/components/Alert.jsx
function Alert({ children, type = 'error' }) {
  const baseClasses = 'p-4 mb-4 rounded-md';
  
  const typeClasses = {
    error: 'bg-red-50 text-red-700 border border-red-200',
    success: 'bg-green-50 text-green-700 border border-green-200',
    warning: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    info: 'bg-blue-50 text-blue-700 border border-blue-200'
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`} role="alert">
      {children}
    </div>
  );
}

export default Alert;
