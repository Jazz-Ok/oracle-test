import {IFilm} from '../components/IFilm';
import {IResident} from '../components/IResident';

export type ItemResponse = IFilm | IResident;

export const isFilmResponse = (response: ItemResponse): response is IFilm =>
  Boolean((response as IFilm).producer);

export const isResidentResponse = (response: ItemResponse): response is IResident =>
  Boolean((response as IResident).eye_color);
