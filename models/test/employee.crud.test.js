const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

  before(async () => {

    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {
    before(async () => {
      const testEmpOne = new Employee({ firstName: 'Adam', lastName: 'Kowal', department: '453ggdfbvb' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Marek', lastName: 'Okon', department: 'joifer7533' });
      await testEmpTwo.save();
    });

    it('should return all the data with find method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return proper document by various params with findOne method', async () => {
      const employee = await Employee.findOne({ firstName: 'Adam', lastName: 'Kowal' });
      const expectedfirstName = 'Adam';
      const expectedlastName = 'Kowal';
      expect(employee.firstName).to.be.equal(expectedfirstName);
      expect(employee.lastName).to.be.equal(expectedlastName);

    });

    after(async () => {
      await Employee.deleteMany();
    });

  });

  describe('Creating data', () => {

    it('should insert new document with insertOne method', async () => {
      const employee = new Employee({ firstName: 'Michał', lastName: 'Ogórek', department: 'jofgfgd43' });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });

  });

  describe('Updating data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'Adam', lastName: 'Kowal', department: '453ggdfbvb' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Marek', lastName: 'Okon', department: 'joifer7533' });
      await testEmpTwo.save();
    });

    it('should properly update one document with updateOne method,', async () => {
      await Employee.updateOne({ firstName: 'Marek', lastName: 'Okon' }, { $set: { firstName: 'Rafał', lastName: 'Ogór' } });
      const updatedEmployee = await Employee.findOne({ firstName: 'Rafał', lastName: 'Ogór' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Marek' });
      employee.firstName = 'Marcin';
      await employee.save();

      const updatedEmployee = await Employee.findOne({ firstName: 'Marcin' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Mariusz' } });
      const employees = await Employee.find({ firstName: 'Mariusz' });
      expect(employees.length).to.be.equal(2);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

  });

  describe('Removing data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'Adam', lastName: 'Kowal', department: '617549cf336472fda0045512' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Marek', lastName: 'Okon', department: '617549cf336472fda0045513' });
      await testEmpTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      const deleteEmployee = await Employee.deleteOne({ firstName: 'Marek' });
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(1);
    });

    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ lastName: 'Kowal' });
      await employee.remove();
      const removedEmployee = await Employee.findOne({ lastName: 'Kowal' });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const removedEmployee = await Employee.find();
      expect(removedEmployee.length).to.be.equal(0);
    });

    it('should show result of Employee.find().populate("department") method', async () => {
      const secObject = await Employee.find().populate('department');
      expect(secObject).to.not.be.null;
    });

  });

});