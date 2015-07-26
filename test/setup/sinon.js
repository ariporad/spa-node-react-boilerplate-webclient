/**
 * Created by Ari on 7/26/15.
 */

import { sandbox } from 'sinon';

beforeEach(() => {
  global.sinon = sandbox.create();
});

afterEach(() => {
  global.sinon.restore();
  global.sinon = undefined;
});