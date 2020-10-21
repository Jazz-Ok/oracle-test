import {IAllPlanets} from './IAllPlanets';
import styled from 'styled-components';
import React, {useCallback, useRef} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';
import {UrlEnum} from 'src/enums';
import {IPlanet} from './IPlanet';
import CircularProgress from '@material-ui/core/CircularProgress';
import Planet from './Planet';

interface ISearchProps {
  storedPlanetModel: IAllPlanets;
  clearAllState: (_: null) => void;
  searchPlanetState: (_: IPlanet) => void;
}

const FormControl = styled.section`
  display: flex;
  align-items: stretch;
  justify-content: center;
`;

const StyledButton = withStyles({
  root: {
    marginLeft: '5px'
  }
})(Button);

const Spinner = styled(CircularProgress)`
  position: relative;
  left: 7px;
`;

const Search: React.FC<ISearchProps> = ({clearAllState, searchPlanetState}) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [isButtonDisabled, setButtonDisabled] = React.useState<boolean>(true);
  const [isInputDisabled, setInputDisabled] = React.useState<boolean>(false);
  const [planetModel, setPlanetModel] = React.useState<IPlanet>(null);

  const handleClick = React.useCallback(() => {
    setButtonDisabled(true);
    setInputDisabled(true);
    const planets = [];
    const planetsUrls = [
      `${UrlEnum.ALL_PLANETS_URL}?page=1`,
      `${UrlEnum.ALL_PLANETS_URL}?page=2`,
      `${UrlEnum.ALL_PLANETS_URL}?page=3`,
      `${UrlEnum.ALL_PLANETS_URL}?page=4`,
      `${UrlEnum.ALL_PLANETS_URL}?page=5`,
      `${UrlEnum.ALL_PLANETS_URL}?page=6`
    ];

    let results;
    const fetchPlanets = (url: string) => {
      fetch(url)
        .then((res) => res.json())
        .then((result) => {
          planets.push(result.results);
          results = result.results.filter(
            (x: IPlanet) =>
              x.name.toLocaleLowerCase() === inputEl.current.value?.toLocaleLowerCase()
          );
          if (results?.length) {
            clearAllState(null);
            searchPlanetState(results);

            setPlanetModel(results);
            inputEl.current.value = '';
            setButtonDisabled(false);
          } else {
            searchPlanetState(results);
          }
          setInputDisabled(false);
        });
    };

    let i = 0;
    while (i < 6) {
      fetchPlanets(planetsUrls[i]);
      if (results?.length) break;
      i++;
    }
  }, []);

  const handleInputChange = useCallback(() => {
    setButtonDisabled(!inputEl.current.value.length);
  }, [inputEl]);

  const handleFocus = useCallback(() => {
    setButtonDisabled(!inputEl.current.value.length);
  }, []);

  return (
    <>
      <FormControl>
        <FormattedMessage id="planetName">
          {(placeholder) => (
            <TextField
              inputRef={inputEl}
              variant="outlined"
              label={placeholder}
              size="small"
              onChange={handleInputChange}
              disabled={isInputDisabled}
              onFocus={handleFocus}
            />
          )}
        </FormattedMessage>

        <StyledButton
          onClick={handleClick}
          variant="outlined"
          color="primary"
          disabled={isButtonDisabled}
        >
          <FormattedMessage id="go" />
          {isInputDisabled && <Spinner color="primary" size={10} />}
        </StyledButton>
      </FormControl>

      {planetModel && <Planet {...planetModel[0]} />}
    </>
  );
};

export default Search;
