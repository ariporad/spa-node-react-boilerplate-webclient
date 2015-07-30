/**
 * Created by Ari on 7/29/15.
 */
import React from 'react';

import Navbar from './Navbar.jsx';

const propTypes = {
  name: React.PropTypes.string.isRequired,
};

class Template extends React.Component {
  render() {
    return (
      <div className="container-fluid page">
        <Navbar name={this.props.name} />
        <div className="app">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Template.propTypes = propTypes;

export default Template;
