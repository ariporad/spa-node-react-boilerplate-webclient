/**
 * Created by Ari on 7/29/15.
 */
import React from 'react';

import Navbar from './Navbar.jsx';
import config from '../config';

/**
 * PropTypes for Template
 * @type {{name: *}}
 */
const propTypes = {
  // name: React.PropTypes.string.isRequired,
};

/**
 * @class
 * @classdesc A template that renders a Navbar and it's children
 */
class Template extends React.Component {
  render() {
    console.log(this);
    return (
      <div className="container-fluid page">
        {/*
          * This is really bad, but react-router doesn't support passing props
          * till v1.0.0, currently in beta
          */}
        <Navbar name={config.name} />
        <div className="app">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Template.propTypes = propTypes;

/**
 * @exports {Template}
 */
export default Template;
