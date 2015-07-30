/**
 * Created by Ari on 7/26/15.
 */
import React from 'react';
import { Nav, /*NavItem,*/ Navbar as BootstrapNavbar/*, DropdownButton, MenuItem*/ } from 'react-bootstrap';
import { NavItemLink/*, ButtonLink, ListGroupItemLink*/ } from 'react-router-bootstrap';

const propTypes = {
  name: React.PropTypes.string.isRequired,
};

class Navbar extends React.Component {
  render() {
    return (
      <BootstrapNavbar brand={<a href="#">{this.props.name}</a>}>
        <Nav>
          <NavItemLink eventKey={1} to="/about">About</NavItemLink>
        </Nav>
      </BootstrapNavbar>
    );
  }
}

Navbar.propTypes = propTypes;

export default Navbar;
