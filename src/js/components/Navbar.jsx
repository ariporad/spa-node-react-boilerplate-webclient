/**
 * Created by Ari on 7/26/15.
 */
import React from 'react';
import { Nav, NavItem, Navbar as BootstrapNavbar, DropdownButton, MenuItem } from 'react-bootstrap';

const propTypes = {
  name: React.PropTypes.string.isRequired,
};

class Navbar extends React.Component {
  render() {
    return (
      <BootstrapNavbar brand={<a href="#">{this.props.name}</a>}>
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
      </BootstrapNavbar>
    );
  }
}

Navbar.propTypes = propTypes;

export default Navbar;
