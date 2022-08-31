import chai from 'chai';
// @ts-ignore
// import { FederatedClass } from 'Federated/FederatedClass';
const expect = chai.expect;

describe('Federated module', () => {
  it('should return a string when testFunction is called', async () => {
    const {FederatedClass} = await import('Federated/FederatedClass');
    const classToTest = new FederatedClass()
    expect(classToTest.testFunction()).to.equal("I'm being tested");
  });
});
