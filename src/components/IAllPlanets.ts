import {IPlanet} from './IPlanet';

export interface IAllPlanets {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPlanet[];
}
