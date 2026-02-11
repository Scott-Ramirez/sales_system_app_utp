import React from 'react';

interface LoginHeaderProps {
  title: string;
  subtitle: string;
}

const LoginHeader: React.FC<LoginHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20">
        <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
        </svg>
      </div>
      <h1 className="text-gray-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
        {title}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
        {subtitle}
      </p>
    </div>
  );
};

export default LoginHeader;