/**
 * Created by Ari on 7/19/15.
 */
import React from 'react';
import { default as Router, Route } from 'react-router';
// import { Nav, NavItem, Navbar, DropdownButton, MenuItem } from
// 'react-bootstrap';
// import { NavItemLink, ButtonLink, ListGroupItemLink }
// from 'react-router-bootstrap';

import config from './config';

import Navbar from './components/Navbar';

const App = React.createClass({
  render: () => {
    return (
      <Navbar name={config.name} />
    );
  },
});

const routes = (
  <Route handler={App} path="/" />
);

Router.run(routes, (Handler) => {
  React.render(<Handler />, document.body);
});
