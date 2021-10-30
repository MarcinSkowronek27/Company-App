const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

  it('should throw an error if no args', () => {
    const emp = new Employee({}); // create new Employee, but don't set `name` attr value

    emp.validate(err => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      // expect(err.errors.department).to.exist;
    });

    after(() => {
      mongoose.models = {};
    });
  });

});