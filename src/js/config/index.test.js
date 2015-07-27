/*global chai,sinon,React,TestUtils,expect*/
/*eslint-env mocha */
/**
 * Created by Ari on 7/27/15.
 */
import config from '.';

describe('index', () => {
  console.log(config);
  it('Should load the correct config based off NODE_ENV', () => {
    expect(config.env).to.be.eql('test');
  });

  it('Should merge common in as well', () => {
    expect(config.name).to.be.a('string');
    expect(config.name).to.have.length.gt(1);
  });

  it('Should allow the env specific file to override common', () => {
    expect(config.env).to.not.eql(false);
  });
});
