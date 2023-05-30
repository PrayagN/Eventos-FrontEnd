import React, { useEffect, useState } from 'react';

const RotatingSquare = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const rotateSquare = () => {
      setRotation((prevRotation) => prevRotation + 1);
    };

    const intervalId = setInterval(rotateSquare, 10);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      className="w-12 h-12 bg-blue-500 absolute"
      style={{
        left: '0',
        top: '50%',
        transformOrigin: 'center',
        transform: `translateY(-50%) rotate(${rotation}deg)`,
      }}
    ></div>
  );
};

export default RotatingSquare;
