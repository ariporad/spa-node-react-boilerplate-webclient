import 'babelify/polyfill';
import 'dotenv/config';
/**
 * Created by Ari on 7/19/15.
 */
import React from 'react';
import Radium from 'Radium';
import { default as Router, Route, DefaultRoute, RouteHandler } from 'react-router';
// import { Nav, NavItem, Navbar, DropdownButton, MenuItem } from
// 'react-bootstrap';
// import { NavItemLink, ButtonLink, ListGroupItemLink }
// from    'react-router-bootstrap';

import Navbar from './components/Navbar.jsx';

import About from './components/About.jsx';
import Home from './components/Home.jsx';

const appPropTypes = {
};

/**
 * @class
 * @classdesc Renders a Navbar and a RouteHandler
 */
@Radium
class App extends React.Component {
  render() {
    return (
      <div className="container-fluid page">
        {/*
         * Ideally this would get passed in as a prop, but react-router doesn't
         * support that till 1.0, which is currently in beta.
         */}
        <Navbar name={process.env.NAME} />
        <div className="app">
          <RouteHandler />
        </div>
      </div>
    );
  }
}

App.propTypes = appPropTypes;

const routes = (
  <Route handler={App} path="/">
    <Route handler={About} path="about" />
    <DefaultRoute handler={Home} />
  </Route>
);

Router.run(routes, (Root) => {
  React.render(<Root />, document.body);
});
