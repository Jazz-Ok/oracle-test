//import IPlanets from "../IPlanets";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default async (url: string): Promise<any> => {
  await fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
