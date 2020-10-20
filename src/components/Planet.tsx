import styled from 'styled-components';
import {Button} from '@material-ui/core';
import React, {useCallback} from 'react';
import {IPlanet} from './IPlanet';
import {PlanetEnum} from '../enums';
import InfoRow from './InfoRow';

const formatDate = (date: string): string => {
  const isoDate = new Date(date);
  return `${isoDate.getDate()}/${isoDate.getMonth() + 1}/${isoDate.getFullYear()}`;
};
const StyledName = styled.h2`
  display: block;
  text-transform: uppercase;
  text-align: center;
`;

const StyledInfoList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  list-style-type: none;
`;

const StyledPlanetDetails = styled(Button)`
  display: inline-block;
`;

const Planet: React.FC<IPlanet> = ({
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
      <StyledName>{name}</StyledName>
      <StyledInfoList>
        <InfoRow rowName={PlanetEnum.climate} rowData={climate} />
        <InfoRow rowName={PlanetEnum.created} rowData={formatDate(created)} />
        <InfoRow rowName={PlanetEnum.diameter} rowData={diameter} />
        <InfoRow rowName={PlanetEnum.edited} rowData={formatDate(edited)} />
        <InfoRow rowName={PlanetEnum.films} rowData={films} />
        <InfoRow rowName={PlanetEnum.gravity} rowData={gravity} />
        <InfoRow rowName={PlanetEnum.orbital_period} rowData={orbital_period} />
        <InfoRow rowName={PlanetEnum.population} rowData={population} />
        <InfoRow rowName={PlanetEnum.residents} rowData={residents} />
        <InfoRow rowName={PlanetEnum.rotation_period} rowData={rotation_period} />
        <InfoRow rowName={PlanetEnum.surface_water} rowData={surface_water} />
        <InfoRow rowName={PlanetEnum.terrain} rowData={terrain} />
      </StyledInfoList>
      <StyledPlanetDetails onClick={handleDetailsClick}>Show more</StyledPlanetDetails>
    </>
  );
};

export default Planet;
