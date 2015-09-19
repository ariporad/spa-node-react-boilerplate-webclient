/**
 * Created by Ari on 7/26/15.
 */
var sandbox = require('sinon').sandbox;

// Before every test, make global.sinon a sandbox, then clean up afterwards.

if (typeof beforeEach == 'function' && typeof afterEach == 'function') {
  beforeEach(function createSandbox() {
    global.sinon = sandbox.create();
  });

  afterEach(function restore() {
    global.sinon.restore();
    delete global.sinon;
  });
}
