import React from 'react';
import Button from '@material-ui/core/Button';
import getAllPlanetsHelper from '../helpers/getInfoHelper';

interface IRequestButtonProps {
  isLoading: boolean;
}
const RequestButton: React.FC<IRequestButtonProps> = ({isLoading}) => {
  const clickHandler = React.useCallback(async () => {
    const fetchUrl = 'https://swapi.dev/api/planets/';

    const request = await getAllPlanetsHelper(fetchUrl);
    console.log(isLoading);
    console.log(request);
  }, [isLoading]);

  return (
    <>
      {request && <div>ura</div>}
      <Button variant="outlined" color="primary" onClick={clickHandler}>
        Get planets
      </Button>
    </>
  );
};

export default RequestButton;
