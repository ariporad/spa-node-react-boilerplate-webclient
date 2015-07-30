/**
 * Created by Ari on 7/19/15.
 */
import React from 'react';
import { default as Router, Route } from 'react-router';
// import { Nav, NavItem, Navbar, DropdownButton, MenuItem } from
// 'react-bootstrap';
// import { NavItemLink, ButtonLink, ListGroupItemLink }
// from    'react-router-bootstrap';

import config from './config';

import Template from './components/Template';

const App = React.createClass({
  render: () => {
    return (
      <h1>Hiya!!</h1>
    );
  },
});

const routes = (
  <Route handler={App} path="/" />
);

Router.run(routes, (Handler) => {
  React.render(<Template name={config.name} ><Handler /></Template>, document.body);
});
