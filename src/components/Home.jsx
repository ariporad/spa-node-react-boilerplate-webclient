/**
 * Created by Ari on 7/29/15.
 */
import React from 'react';
import Radium from 'radium';

import config from '../config';

/**
 * PropTypes for Home
 * @type {{}}
 */
const propTypes = {
};

/**
 * @classdesc A basic home page that displays a welcome message
 * @class
 */
@Radium
class Home extends React.Component {
  render() {
    return (
      <p>Welcome to {config.name}!</p>
    );
  }
}

Home.propTypes = propTypes;

/**
 * @exports {Home}
 */
export default Home;
