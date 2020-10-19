import React from 'react';

interface IPlanetProps {
  name: string;
}

const Planet: React.FC<IPlanetProps> = ({name}) => {
  return (
    <>
      <h4>{name}</h4>
    </>
  );
};

export default Planet;
