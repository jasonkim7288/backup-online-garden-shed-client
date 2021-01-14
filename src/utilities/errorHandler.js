export const handleError = (err, history) => {
  const { response: res } = err;
  if (res) {
    switch (res.status) {
      case 400:
        history.push('/error/400');
        break;
      case 404:
      default:
        history.push('/error/404');
    }
  }
};