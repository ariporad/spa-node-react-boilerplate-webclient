/**
 * Created by Ari on 7/29/15.
 */
import React from 'react';
import Radium from 'radium';

/**
 * PropTypes for About
 * @type {{}}
 */
const propTypes = {
};

/**
 * @classdesc An about page, has some filler content right now.
 * @class
 */
@Radium
class About extends React.Component {
  render() {
    return (
      <p>Ari is the King. All Hail King Ari!</p>
    );
  }
}

About.propTypes = propTypes;

/**
 * @export {About}
 */
export default About;
