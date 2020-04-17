import facade from "./authFacade";

function apiFetchFacade() {
  function handleHttpErrors(res) {
    if (!res.ok) {
      return Promise.reject({ status: res.status, fullError: res.json() });
    }
    return res.json();
  }

  const getApiFetch = () => {
    const options = facade.makeOptions("GET", true);
    return fetch("https://cphfb.codes/ca3/api/info/test", options).then(
      handleHttpErrors
    );
  };

  return {
    getApiFetch,
  };
}

export default apiFetchFacade;
