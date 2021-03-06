/**
 * Created by Ari on 7/26/15.
 */

import { sandbox } from 'sinon';

// Before every test, make global.sinon a sandbox, then clean up afterwards.

if (typeof beforeEach == 'function' && typeof afterEach == 'function') {
  beforeEach(() => {
    global.sinon = sandbox.create();
  });

  afterEach(() => {
    global.sinon.restore();
    global.sinon = undefined;
  });
}
