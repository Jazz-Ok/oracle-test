import styled from 'styled-components';
import {Button} from '@material-ui/core';
import React, {useCallback} from 'react';
import {IPlanet} from './IPlanet';

interface IPlanetProps extends IPlanet {
  bla?: boolean;
}

const StyledPlanetDetails = styled(Button)`
  display: inline-block;
`;

const Planet: React.FC<IPlanetProps> = ({
  name,
  climate,
  created,
  diameter,
  edited,
  films,
  gravity,
  orbital_period,
  population,
  residents,
  rotation_period,
  surface_water,
  terrain,
  url
}) => {
  const handleDetailsClick = useCallback(() => {
    console.log(url);
  }, [url]);
  return (
    <>
      <h2>{name}</h2>
      <ul>
        <li>{climate}</li>
        <li>{created}</li>
        <li>{diameter}</li>
        <li>{edited}</li>
        <li>
          {films.map((film) => (
            <span key={film}>{film}</span>
          ))}
        </li>
        <li>{gravity}</li>
        <li>{orbital_period}</li>
        <li>{population}</li>
        <li>
          {residents.map((resident) => (
            <span key={resident}>{resident}</span>
          ))}
        </li>
        <li>{rotation_period}</li>
        <li>{surface_water}</li>
        <li>{terrain}</li>
      </ul>
      <StyledPlanetDetails onClick={handleDetailsClick}>Show more</StyledPlanetDetails>
    </>
  );
};

export default Planet;
