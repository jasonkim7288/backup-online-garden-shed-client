export const handleError = (err, history) => {
  const { response: res } = err;
  console.log('res:', res);
  if (res) {
    switch (res.status) {
      case 400:
        history.push('/error/400');
        break;
      case 401:
        history.push('/error/401');
        break;
      case 404:
        history.push('/error/404');
        break;
      default:
        break;
    }
  }
};