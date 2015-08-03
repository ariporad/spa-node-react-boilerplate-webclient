/**
 * Created by Ari on 7/26/15.
 */

import chai from 'chai';
import sinon from 'sinon-chai';

// Sets up chai to use sinon-chai, calls chai.should, and chai.expect as a global.
chai.use(sinon);
chai.should();

global.expect = chai.expect;