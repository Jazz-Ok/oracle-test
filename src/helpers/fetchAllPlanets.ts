import {IAllPlanets} from 'components/IAllPlanets';
import {UrlEnum} from '../enums';
import formatUrl from '../helpers/formatUrl';

export const fetchParams = {
  method: 'GET'
};

export const fetchAllPlanets = (
  url: string = UrlEnum.ALL_PLANETS_FETCH_URL
): Promise<IAllPlanets> => {
  return fetch(formatUrl(url), fetchParams).then((res) => res.json());
};
