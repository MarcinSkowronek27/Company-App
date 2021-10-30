const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const firstName = require('../employee.model.js');
const lastName = require('../employee.model.js');
const department = require('../employee.model.js');

describe('Employee', () => {

  it('should throw an error if no args', () => {

    const emp = new Employee({}); // create new Employee, but don't set `name` attr value

    emp.validate(err => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.department).to.exist;
    });

    after(() => {
      mongoose.models = {};
    });
  });

  it('should throw an error if "arg" is not a string', () => {
    const cases = [{}, []]
    for (let atribute of cases) {
      const emp = new Employee({ firstName: atribute, lastName: atribute }); // create new Employee, but don't set one of attr value

      emp.validate(err => {
        expect(err.errors.firstName).to.exist;
        expect(err.errors.lastName).to.exist;
      });
    }
  });

  it('should not throw an error if args are okay', () => {

    const cases = [{}];
    for (let atribute of cases) {
      const emp = new Employee({ firstName: atribute, lastName: atribute });

      emp.validate(err => {
        expect(err.firstName).to.not.exist;
        expect(err.lastName).to.not.exist;
      });

    }

  });

});