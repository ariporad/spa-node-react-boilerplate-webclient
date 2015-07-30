/**
 * Created by Ari on 7/19/15.
 */
import React from 'react';
import { default as Router, Route, RouteHandler } from 'react-router';
// import { Nav, NavItem, Navbar, DropdownButton, MenuItem } from
// 'react-bootstrap';
// import { NavItemLink, ButtonLink, ListGroupItemLink }
// from    'react-router-bootstrap';

import config from './config';

import Navbar from './components/Navbar.jsx';
import About from './components/About.jsx';

const App = React.createClass({
  render: () => {
    return (
      <div className="container-fluid page">
        <Navbar name={config.name} />
        <div className="app">
          <RouteHandler />
        </div>
      </div>
    );
  },
});

const routes = (
  <Route handler={App} path="/">
    <Route handler={About} path="/about" />
  </Route>
);

Router.run(routes, (Root) => {
  React.render(<Root />, document.body);
});
