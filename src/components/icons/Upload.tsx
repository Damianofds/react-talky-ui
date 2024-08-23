import React from 'react';

const Upload: React.FC<IconProps> = ({ width = '24px', height = '24px', color = 'white' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      stroke={color}
      fill='white'
    >
      <path d="M13.5 3H12H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H7.5M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V9.75V12V19C19 20.1046 18.1046 21 17 21H16.5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 21L12 13M12 13L14.5 15.5M12 13L9.5 15.5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default Upload;
