export default (url: string) => {
  return url.replace(/^http:\/\//i, 'https://');
};
