/**
 * Created by Ari on 7/29/15.
 */
import React from 'react';

import config from '../config';

const propTypes = {
};

class Home extends React.Component {
  render() {
    return (
      <p>Welcome to {config.name}!</p>
    );
  }
}

Home.propTypes = propTypes;

export default Home;
