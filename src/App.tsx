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
import formatUrl from './helpers/formatUrl';

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
  const [searchPlanet, setSearchPlanet] = React.useState<IPlanet>(null);
  const [page, setPage] = React.useState<number>(appConfig.START_PAGE);
  const [noOfPages, setNoOfPages] = React.useState(
    Math.ceil(planetsObject?.results.length / itemsPerPage)
  );

  const params = {
    method: 'GET'
  };

  React.useEffect(() => {
    const fetchPlanets = () => {
      fetch(UrlEnum.ALL_PLANETS_URL, params)
        .then((res) => res.json())
        .then((result: IAllPlanets) => {
          setPlanetsObject(result);
          setPlanetList(result?.results);
          setNoOfPages(Math.ceil(result?.results.length / itemsPerPage));
          setLoading(false);
        });
    };
    fetchPlanets();
  }, []);

  const handlePageChange = React.useCallback(
    (_, value) => {
      setPage(value);
      if (value === noOfPages && planetsObject.next?.length) {
        getNextPage();
      }
      console.log(planetList);
    },
    [page, noOfPages, planetsObject]
  );

  const getNextPage = () => {
    handleDataSet(planetsObject.next);
  };

  const handleDataSet = React.useCallback((url: string) => {
    const fetchUrl = formatUrl(url);
    fetch(fetchUrl, params)
      .then((res) => res.json())
      .then((result: IAllPlanets) => {
        console.log('planetList ', planetList);
        console.log('result?.results ', result?.results);
        setPlanetList(planetList.concat(result?.results));
        console.log('concat ', planetList);
        setPlanetsObject(result);
        setNoOfPages(Math.ceil(result?.results.length / itemsPerPage));
        setLoading(false);
      });
  }, []);

  const renderPlanets = React.useCallback(() => {
    return planetsObject?.results
      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
      .map((planet: IPlanet) => <Planet key={planet.name} {...planet} />);
  }, [page, planetsObject?.results, itemsPerPage]);

  const renderSearchedPlanet = React.useCallback(() => {
    console.log(planetList);
    return <Planet {...planetList[0]} />;
  }, [planetList]);

  return (
    <IntlProvider locale="cs-CZ" messages={translations}>
      <GlobalStyle bodyBackground={appStyles.LIGHT} color={appStyles.DARK} />
      {isLoading && (
        <Spinner>
          <CircularProgress color="secondary" />
        </Spinner>
      )}
      {!isLoading && <Search storedPlanetModel={planetsObject} clearAllState={setPlanetsObject} />}
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
