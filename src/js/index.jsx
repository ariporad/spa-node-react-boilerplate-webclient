import 'babelify/polyfill';
/**
 * Created by Ari on 7/19/15.
 */
import React from 'react';
import { default as Router, Route, DefaultRoute } from 'react-router';
// import { Nav, NavItem, Navbar, DropdownButton, MenuItem } from
// 'react-bootstrap';
// import { NavItemLink, ButtonLink, ListGroupItemLink }
// from    'react-router-bootstrap';

import config from './config';

import Template from './components/Template.jsx';

import About from './components/About.jsx';
import Home from './components/Home.jsx';

console.log('Running with config:');
console.log(config);

const routes = (
  <Route handler={Template} path="/">
    <Route handler={About} path="/about" />
    <DefaultRoute handler={Home} />
  </Route>
);

Router.run(routes, (Root) => {
  React.render(<Root />, document.body);
});
