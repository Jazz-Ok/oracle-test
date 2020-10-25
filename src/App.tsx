import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {IAllPlanets} from './components/IAllPlanets';
import {IPlanet} from './components/IPlanet';
import appStyles from './configuration/styles';
import Pagination from '@material-ui/lab/Pagination';
import styled from 'styled-components';
import {createGlobalStyle} from 'styled-components';
import Planet from 'components/Planet';
import Search from 'components/Search';
import appConfig from './configuration/app';
import {IntlProvider} from 'react-intl';
import {DEFAULT_TRANSLATIONS} from './Localizations';
import {fetchAllPlanets} from './helpers/fetchAllPlanets';

interface IAppStyleProps {
  bodyBackground: string;
  color: string;
}

const StyledPagination = styled(Pagination)`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
`;

const rootEl = document.getElementById('vladimir-app-root') as HTMLDivElement;

/* Applicaion is localized and prepared for reading localizations from markup */
const translations = rootEl?.dataset.translations
  ? {
      ...DEFAULT_TRANSLATIONS,
      ...JSON.parse(decodeURIComponent(rootEl.dataset.translations))
    }
  : DEFAULT_TRANSLATIONS;

const planets = [];

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

const StyledPlanetListing = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  width: 88%;

  @media (min-width: 900px) {
    flex-direction: row;
    width: auto;
  }
`;

const App: React.FC = () => {
  const itemsPerPage = appConfig.ITEMS_PER_PAGE;
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [planetsObject, setPlanetsObject] = React.useState<IAllPlanets>(null);
  const [planetList, setPlanetList] = React.useState<IPlanet[]>([]);
  const [page, setPage] = React.useState<number>(appConfig.START_PAGE);
  const [noOfPages, setNoOfPages] = React.useState(
    Math.ceil(planetsObject?.results.length / itemsPerPage)
  );
  const [fetchUrl, setFetchUrl] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    fetchAllPlanets(fetchUrl).then((result: IAllPlanets) => {
      planets.concat(result?.results);
      setPlanetList(planetList.concat(result?.results));
      if (result.next?.length) {
        setFetchUrl(result.next);
      } else {
        setLoading(false);
        setPlanetsObject(result);
        setNoOfPages(Math.ceil(planetList.length / itemsPerPage));
        setPlanetList(planetList);
      }
    });
    setLoading(false);
  }, [fetchUrl]);

  const handlePageChange = React.useCallback(
    (_, value) => {
      setPage(value);
    },
    [page, planetList]
  );

  const renderPlanets = React.useCallback(() => {
    return planetList
      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
      .map((planet: IPlanet) => <Planet key={planet.name} {...planet} />);
  }, [page, planetList, itemsPerPage]);

  return (
    <IntlProvider locale="cs-CZ" messages={translations}>
      <GlobalStyle bodyBackground={appStyles.LIGHT} color={appStyles.DARK} />
      {isLoading && (
        <Spinner>
          <CircularProgress color="secondary" />
        </Spinner>
      )}
      {!isLoading && (
        <Search
          storedPlanetModel={planetsObject}
          clearAllState={setPlanetsObject}
          planetList={planetList}
        />
      )}
      {!isLoading && planetsObject && <StyledPlanetListing>{renderPlanets()}</StyledPlanetListing>}

      {planetsObject && (
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
