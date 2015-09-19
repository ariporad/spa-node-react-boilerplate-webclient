/**
 * Created by Ari on 7/26/15.
 */

var chai = require('chai');
var sinon = require('sinon-chai');

// Sets up chai to use sinon-chai, calls chai.should, and chai.expect as a global.
chai.use(sinon);
chai.should();

global.expect = chai.expect;