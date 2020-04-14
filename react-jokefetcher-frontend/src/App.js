import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, NavLink } from "react-router-dom";

function App({ jokeFacade, scrapeFacade, authFacade }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const logout = () => {
    authFacade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    authFacade
      .login(user, pass)
      .then(res => setLoggedIn(true))
      .catch(res =>
        alert("Status code : " + res.status + " Wrong username or password.")
      );
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <LogIn login={login} />
      ) : (
        <div>
          <LoggedIn jokeFacade={jokeFacade} scrapeFacade={scrapeFacade} />
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = evt => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = evt => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onChange={onChange}>
        <input placeholder="User Name" id="username" />
        <input placeholder="Password" id="password" />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  );
}

function LoggedIn({ jokeFacade, scrapeFacade }) {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/jokes">
          <Jokes jokeFacade={jokeFacade} />
        </Route>
        <Route path="/scrape">
          <Scrape scrapeFacade={scrapeFacade} />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

function Header() {
  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/jokes">
            Jokes
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/scrape">
            Scrape
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h3>No match for that route</h3>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Jokes({ jokeFacade }) {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    jokeFacade()
      .getJokes()
      .then(data => {
        setJokes({ ...data });
      });
  }, []);

  return (
    <div>
      <ul>
        <li>Chuck joke : {jokes.chuckJoke}</li>
        <li>Chuck joke url : {jokes.chuckJokeURL}</li>
        <li>Dad joke : {jokes.dadJoke}</li>
        <li>Dad joke url : {jokes.dadJokeURL}</li>
      </ul>
    </div>
  );
}

function Scrape({ scrapeFacade }) {
  const [scrapes, setScrapes] = useState([]);

  useEffect(() => {
    scrapeFacade()
      .getScrape()
      .then(data => {
        setScrapes(data);
      });
  }, []);

  return (
    <div>
      {scrapes.map((scrape, index) => (
        <ul key={index}>
          <li>Title : {scrape.title}</li>
          <li>URL : {scrape.url}</li>
          <li>Div count : {scrape.divCount}</li>
          <li>Body count : {scrape.bodyCount}</li>
        </ul>
      ))}
    </div>
  );
}

export default App;
