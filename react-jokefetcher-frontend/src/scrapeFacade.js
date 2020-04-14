import facade from "./authFacade";

function scrapeFacade() {
  function handleHttpErrors(res) {
    if (!res.ok) {
      return Promise.reject({ status: res.status, fullError: res.json() });
    }
    return res.json();
  }

  const getScrape = () => {
    const options = facade.makeOptions("GET", true);
    return fetch(
      "http://localhost:8080/securitystarter/api/scrape",
      options
    ).then(handleHttpErrors);
  };

  return {
    getScrape
  };
}

export default scrapeFacade;
