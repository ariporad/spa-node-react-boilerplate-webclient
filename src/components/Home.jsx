/**
 * Created by Ari on 7/29/15.
 */
import React from 'react';
import Radium from 'radium';

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
      <p>Welcome to {process.env.NAME}!</p>
    );
  }
}

Home.propTypes = propTypes;

/**
 * @exports {Home}
 */
export default Home;
