import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {IAllPlanets} from './components/IAllPlanets';
import {IPlanet} from './components/IPlanet';
import {UrlEnum} from './enums';
import appStyles from './configuration/styles';
import Pagination from '@material-ui/lab/Pagination';
import styled from 'styled-components';
import {createGlobalStyle} from 'styled-components';
import Planet from 'components/Planet';
import Search from 'components/Search';
import appConfig from './configuration/app';
import {IntlProvider} from 'react-intl';
import {DEFAULT_TRANSLATIONS} from './Localizations';

interface IAppStyleProps {
  bodyBackground: string;
  color: string;
}

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
`;

const rootEl = document.getElementById('vladimir-app-root') as HTMLDivElement;

/* Applicaion is localized and prepared for reading localizations from markup */
const translations = rootEl?.dataset.translations
  ? {
      ...DEFAULT_TRANSLATIONS,
      ...JSON.parse(decodeURIComponent(rootEl.dataset.translations))
    }
  : DEFAULT_TRANSLATIONS;

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
  const itemsPerPage = appConfig.ITEMS_PER_PAGE;
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [planetsList, setPlanetsList] = React.useState<IAllPlanets>(null);
  const [page, setPage] = React.useState<number>(appConfig.START_PAGE);
  const [noOfPages] = React.useState(Math.ceil(planetsList?.results.length / itemsPerPage));

  React.useEffect(() => {
    const params = {
      method: 'GET'
    };

    const fetchPlanets = () => {
      fetch(UrlEnum.ALL_PLANETS_URL, params)
        .then((res) => res.json())
        .then((result) => {
          setPlanetsList(result);
          setLoading(false);
        });
    };
    fetchPlanets();
  }, []);

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const renderPlanets = React.useCallback(() => {
    return planetsList?.results
      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
      .map((planet: IPlanet) => <Planet key={planet.name} {...planet} />);
  }, [page, planetsList?.results, itemsPerPage]);

  return (
    <IntlProvider locale="cs-CZ" messages={translations}>
      <GlobalStyle bodyBackground={appStyles.LIGHT} color={appStyles.DARK} />
      {isLoading && (
        <Spinner>
          <CircularProgress color="secondary" />
        </Spinner>
      )}
      {!isLoading && <Search storedPlanetModel={planetsList} clearState={setPlanetsList} />}
      {!isLoading && planetsList && renderPlanets()}

      {planetsList && (
        <StyledPagination
          showFirstButton
          showLastButton
          defaultPage={page}
          count={noOfPages}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          color="secondary"
        />
      )}
    </IntlProvider>
  );
};

export default App;
