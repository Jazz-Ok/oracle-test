import styled from 'styled-components';
import React, {useCallback, useRef} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core';
import {FormattedMessage} from 'react-intl';
import {IPlanet} from './IPlanet';
import CircularProgress from '@material-ui/core/CircularProgress';
import Planet from './Planet';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

interface ISearchProps {
  clearAllState: (_: IPlanet[]) => void;
  planetList: IPlanet[];
  setFetchUrl: (_: string | undefined) => void;
  setNoOfPages: (_: number) => void;
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

const StyledSearchResult = styled.div`
  align-self: center;
`;

const StyledBackButton = withStyles({
  root: {
    marginRight: '5px'
  }
})(Button);

const Search: React.FC<ISearchProps> = ({clearAllState, planetList, setFetchUrl, setNoOfPages}) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [isButtonDisabled, setButtonDisabled] = React.useState<boolean>(true);
  const [isInputDisabled, setInputDisabled] = React.useState<boolean>(false);
  const [planetModel, setPlanetModel] = React.useState<IPlanet[]>(null);

  const handleClick = React.useCallback(() => {
    setButtonDisabled(true);
    setInputDisabled(true);

    const searchResult = planetList.filter(
      (x: IPlanet) => x.name.toLocaleLowerCase() === inputEl.current.value?.toLocaleLowerCase()
    );

    if (searchResult?.length) {
      clearAllState([]);
      inputEl.current.value = '';
      setButtonDisabled(false);
      setPlanetModel(searchResult);
    }
    setInputDisabled(false);
  }, [planetList]);

  const handleBackClick = React.useCallback(() => {
    clearAllState(planetList);
    setPlanetModel(null);
    setFetchUrl(undefined);
    setNoOfPages(0);
  }, [planetList]);

  const handleInputChange = useCallback(() => {
    setButtonDisabled(!inputEl.current.value.length);
  }, [inputEl]);

  const handleFocus = useCallback(() => {
    setButtonDisabled(!inputEl.current.value.length);
  }, []);

  return (
    <>
      <FormControl>
        {planetModel && (
          <StyledBackButton variant="outlined" color="primary" onClick={handleBackClick}>
            <ArrowBackIosIcon />
          </StyledBackButton>
        )}
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
      <StyledSearchResult>{planetModel && <Planet {...planetModel[0]} />}</StyledSearchResult>
    </>
  );
};

export default Search;
