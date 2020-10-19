import styled from 'styled-components';
import React, {useCallback, useRef} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core';

interface ISearchProps {
  name?: string;
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

const Search: React.FC<ISearchProps> = () => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [isButtonDisabled, setButtonDisabled] = React.useState<boolean>(true);

  const handleClick = useCallback(() => {
    console.log(inputEl.current.value);
  }, []);

  const handleInputChange = useCallback(() => {
    setButtonDisabled(!inputEl.current.value.length);
  }, [inputEl]);

  return (
    <FormControl>
      <TextField
        inputRef={inputEl}
        variant="outlined"
        label="Planet name..."
        size="small"
        onChange={handleInputChange}
      />
      <StyledButton
        onClick={handleClick}
        variant="outlined"
        color="primary"
        disabled={isButtonDisabled}
      >
        Go!
      </StyledButton>
    </FormControl>
  );
};

export default Search;
