import {IAllPlanets} from './IAllPlanets';
import styled from 'styled-components';
import React, {useCallback, useRef} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';
import {UrlEnum} from 'src/enums';
import {IPlanet} from './IPlanet';
import Planet from './Planet';

interface ISearchProps {
  storedPlanetModel: IAllPlanets;
  clearState: (_: null) => void;
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

const Search: React.FC<ISearchProps> = ({clearState}) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [isButtonDisabled, setButtonDisabled] = React.useState<boolean>(true);
  const [isInputDisabled, setInputDisabled] = React.useState<boolean>(false);
  const [searchedPlanet, setSearchedPlanet] = React.useState<IPlanet>(null);

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
            (x) => x.name.toLocaleLowerCase() === inputEl.current.value?.toLocaleLowerCase()
          );
          if (results?.length) {
            setSearchedPlanet(results);
            clearState(null);
            console.log(inputEl.current.value);
          }
        });
    };

    let i = 0;
    while (i < 6) {
      fetchPlanets(planetsUrls[i]);
      if (results?.length) {
        console.log(inputEl.current.value);
        break;
      }
      i++;
    }

    setButtonDisabled(false);
    setInputDisabled(false);
  }, []);

  const handleInputChange = useCallback(() => {
    setButtonDisabled(!inputEl.current.value.length);
  }, [inputEl]);

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
        </StyledButton>
      </FormControl>

      {searchedPlanet && <Planet {...searchedPlanet} />}
    </>
  );
};

export default Search;
