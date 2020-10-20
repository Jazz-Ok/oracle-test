import {IAllPlanets} from './IAllPlanets';
import styled from 'styled-components';
import React, {useCallback, useRef} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';

interface ISearchProps {
  storedPlanetModel: IAllPlanets;
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

// const params = {
//   method: 'GET'
// };

const Search: React.FC<ISearchProps> = ({storedPlanetModel}) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [isButtonDisabled, setButtonDisabled] = React.useState<boolean>(true);
  const [isInputDisabled, setInputDisabled] = React.useState<boolean>(false);
  const [planetModel, setPlanetModel] = React.useState<IAllPlanets>(storedPlanetModel);

  console.log('planetsList state: ', planetModel);

  let fetchedPlanetModel = storedPlanetModel;

  const handleClick = React.useCallback(() => {
    setButtonDisabled(true);
    setInputDisabled(true);

    const work = async () => {
      let i = 0;

      while (planetModel.next && i < 10) {
        const results = storedPlanetModel.results.filter(
          (x) => x.name.toLocaleLowerCase() === inputEl.current.value?.toLocaleLowerCase()
        );
        if (results.length) {
          console.log('gotcha: ', results);
          setButtonDisabled(false);
          setInputDisabled(false);
          break;
        }
        const response = await fetch(fetchedPlanetModel.next);
        fetchedPlanetModel = await response.json();
        setPlanetModel(fetchedPlanetModel);
        console.log(fetchedPlanetModel);
        i++;
      }
    };
    work();

    // const searchPlanet = async () => {
    //   const searchedPlanet = await searchInStored(planetModel);

    //   if (searchedPlanet.length) {
    //     console.log('gotcha: ', searchedPlanet);
    //     // done!
    //   } else if (!searchedPlanet.length && planetModel.next) {
    //     let i = 0;
    //     while (planetModel.next && i < 10) {
    //       const res = await getPlanets(planetModel.next);
    //       const json = await res;
    //       console.log(json);
    //       i++;
    //     }
    //     // fetch next
    //   }
    // };
  }, [planetModel]);

  // const searchInStored = async (storedPlanetModel: IAllPlanets) => {
  //   const results = storedPlanetModel.results.filter(
  //     (x) => x.name.toLocaleLowerCase() === inputEl.current.value?.toLocaleLowerCase()
  //   );
  //   console.log('Planets: ', storedPlanetModel);
  //   console.log('Search term: ', inputEl.current.value);

  //   console.log('Search result: ', results);
  //   return results;
  // };
  // const getPlanets = async (url: string) => {
  //   const fetchUrl = url.replace(/^http:\/\//i, 'https://');

  //   const fetchPlanets = async () => {
  //     fetch(fetchUrl, params)
  //       .then((res) => res.json())
  //       .then((result) => {
  //         setPlanetModel(result);
  //         searchInStored(planetModel);
  //       });
  //   };
  //   fetchPlanets();
  // };

  const handleInputChange = useCallback(() => {
    setButtonDisabled(!inputEl.current.value.length);
  }, [inputEl]);

  return (
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
  );
};

export default Search;
