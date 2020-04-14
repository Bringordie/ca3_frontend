import facade from "./authFacade";

function jokeFacade() {
  function handleHttpErrors(res) {
    if (!res.ok) {
      return Promise.reject({ status: res.status, fullError: res.json() });
    }
    return res.json();
  }

  const getJokes = () => {
    const options = facade.makeOptions("GET", true);
    return fetch(
      "http://localhost:8080/securitystarter/api/jokes",
      options
    ).then(handleHttpErrors);
  };

  return {
    getJokes
  };
}

export default jokeFacade;
