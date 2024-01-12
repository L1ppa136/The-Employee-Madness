/*
Loading the .env file and creates environment variables from it
*/
require('dotenv').config();
const mongoose = require('mongoose');
const names = require('./names.json');
const levels = require('./levels.json');
const positions = require('./positions.json');
const designations = require('./designations.json');
const types = require('./types.json');
const brands = require('./brands.json');
const EmployeeModel = require('../db/employee.model');
const EquipmentModel = require('../db/equipment.model');
const FavouriteBrandModel = require('../db/brands.model');

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error('Missing MONGO_URL environment variable');
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  await FavouriteBrandModel.deleteMany({});

  const brandDocument = await FavouriteBrandModel.create(brands.map((name) => ({ name })));

  const brandIds = brandDocument.map((brand) => brand._id);

  const employees = names.map((name) => {
    const nameParts = name.split(' ');
    const employee = {
      name: { firstname: nameParts[0], middlename: '', lastname: nameParts[nameParts.length - 1] },
      level: pick(levels),
      position: pick(positions),
      presence: {
        date: new Date(),
        present: false,
      },
      equipment: '',
      favouriteBrand: pick(brandIds),
    };
    if (nameParts.length > 2) {
      employee.name.middlename = nameParts[1];
    }

    return employee;
  });

  await EmployeeModel.create(...employees);
  console.log('Employees created');
  console.log('Favourite brands created');
};

const populateEquipments = async () => {
  await EquipmentModel.deleteMany({});

  const equipments = designations.map((designation) => ({
    designation,
    type: pick(types),
    amount: Math.floor(Math.random() * 20) + 1,
  }));

  await EquipmentModel.create(...equipments);
  console.log('Equipments created');
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();

  await populateEquipments();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
