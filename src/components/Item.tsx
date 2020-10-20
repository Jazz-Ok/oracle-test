import React from 'react';
import styled from 'styled-components';
import {IFilm} from './IFilm';
import {IResident} from './IResident';
import {isFilmResponse} from '../guards/guards';
import {FormattedMessage} from 'react-intl';

interface IItemProps {
  url: string;
}

const StyledItemName = styled.li`
  display: block;
  font-style: italic;
`;

const Item: React.FC<IItemProps> = ({url}) => {
  const [filmData, setFilmData] = React.useState<IFilm>(null);
  const [residentData, setResidentData] = React.useState<IResident>(null);

  const params = {
    method: 'GET'
  };

  React.useEffect(() => {
    const getFilms = async () => {
      const fetchUrl = url.replace(/^http:\/\//i, 'https://');

      fetch(fetchUrl, params)
        .then((res) => res.json())
        .then((result) => {
          isFilmResponse(result) ? setFilmData(result) : setResidentData(result);
        });
    };
    getFilms();
  }, []);

  if (filmData || residentData) {
    return <StyledItemName>{filmData?.title || residentData?.name}</StyledItemName>;
  } else {
    return <FormattedMessage id="noData" />;
  }
};

export default Item;
