export default (url: string): string => {
  return url.replace(/^http:\/\//i, 'https://');
};
