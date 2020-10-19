import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {IAllPlanets} from './components/IAllPlanets';
import {IPlanet} from './components/IPlanets';
import RequestUrl from './enums';
import appStyles from './configuration/styles';
import Pagination from '@material-ui/lab/Pagination';
import styled from 'styled-components';
import {createGlobalStyle} from 'styled-components';
import Planet from 'components/Planet';
import Search from 'components/Search';
//import RequestButton from "components/RequestButton";

interface IAppStyleProps {
  bodyBackground: string;
  color: string;
}

const GlobalStyle = createGlobalStyle`
	body {
		background-color: ${(props: IAppStyleProps) => props.bodyBackground};
		color: ${(props: IAppStyleProps) => props.color};
	}
`;

const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const App: React.FC = () => {
  const itemsPerPage = 5;
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [planetsList, setPlanetsList] = React.useState<IAllPlanets>(null);
  const [page, setPage] = React.useState<number>(1);
  const [noOfPages] = React.useState(Math.ceil(planetsList?.results.length / itemsPerPage));

  React.useEffect(() => {
    const params = {
      method: 'GET'
    };

    const fetchPlanets = () => {
      fetch(RequestUrl.ALL_PLANETS, params)
        .then((res) => res.json())
        .then((result) => {
          setPlanetsList(result);
          setLoading(false);
        });
    };
    fetchPlanets();
  }, [isLoading]);

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const renderPlanets = React.useCallback(() => {
    return planetsList?.results
      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
      .map((planet: IPlanet) => <Planet key={planet.name} name={planet.name} />);
  }, [page, planetsList?.results]);

  return (
    <React.Fragment>
      <GlobalStyle bodyBackground={appStyles.LIGHT} color={appStyles.DARK} />
      {isLoading && (
        <Spinner>
          <CircularProgress color="secondary" />
        </Spinner>
      )}
      {!isLoading && <Search />}
      {planetsList && renderPlanets()}

      <Pagination
        showFirstButton
        showLastButton
        defaultPage={1}
        count={noOfPages}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        color="secondary"
      />
    </React.Fragment>
  );
};

export default App;
