import chai from 'chai';
// @ts-ignore
import { FederatedClass } from 'Federated/FederatedClass';

const expect = chai.expect;

describe('Federated module', () => {
    it('should return a string when testFunction is called', () => {
      expect(FederatedClass.testFunction()).to.equal("I'm being tested");
    });
});
