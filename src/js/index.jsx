/**
 * Created by Ari on 7/19/15.
 */
import React from 'react';
import { default as Router, Route } from 'react-router';
import { Nav, NavItem, Navbar, DropdownButton, MenuItem } from 'react-bootstrap';
// import { NavItemLink, ButtonLink, ListGroupItemLink } from
// 'react-router-bootstrap';

import config from './config';

const App = React.createClass({
  render: () => {
    return (
      <Navbar brand={<a href="#">{config.name}</a>}>
        <Nav>
          <NavItem eventKey={1} href="#">Link</NavItem>
          <NavItem eventKey={2} href="#">Link</NavItem>
          <DropdownButton eventKey={3} title="Dropdown">
            <MenuItem eventKey="1">Action</MenuItem>
            <MenuItem eventKey="2">Another action</MenuItem>
            <MenuItem eventKey="3">Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="4">Separated link</MenuItem>
          </DropdownButton>
        </Nav>
      </Navbar>
    );
  },
});

const routes = (
  <Route handler={App} path="/" />
);

Router.run(routes, (Handler) => {
  React.render(<Handler />, document.body);
});
