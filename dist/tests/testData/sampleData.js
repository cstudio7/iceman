"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commentBody = exports.departments = exports.userDepartments = exports.user3 = exports.user2 = exports.user1 = exports.noProfileRequest = exports.tripRequest = exports.returnRequest = exports.userDepartment = exports.department = exports.testRequest = exports.oneWayTrip2 = exports.oneWayTrip = exports.user4 = exports.managerUser = exports.user = exports.missingRequiredField = exports.multiRequest2 = exports.multiRequest = void 0;
const multiRequest = {
  source: 'Nigeria',
  destination: 'Abuja, USA, POLAND',
  tripType: 'multi-city',
  travelDate: Date.now(),
  returnDate: Date.now(),
  reason: 'reason',
  accommodation: 'accommodation',
  gender: 'female',
  preferredLanguage: 'french',
  passportName: 'My Name',
  passportNumber: '1212323',
  preferredCurrency: 'Euro',
  residentialAddress: 'Delta state',
  rememberProfile: false
};
exports.multiRequest = multiRequest;
const multiRequest2 = {
  source: 'Nigeria',
  destination: 'Abuja, USA, POLAND',
  tripType: 'multi-city',
  travelDate: Date.now(),
  reason: 'reason',
  accommodation: 'accommodation',
  gender: 'female',
  preferredLanguage: 'french',
  passportName: 'My Name',
  passportNumber: '1212323',
  preferredCurrency: 'Euro',
  residentialAddress: 'Delta state',
  rememberProfile: false
};
exports.multiRequest2 = multiRequest2;
const missingRequiredField = {
  tripType: 'multi-city',
  travelDate: Date.now(),
  returnDate: Date.now(),
  reason: 'reason',
  accommodation: 'accommodation',
  gender: 'female',
  preferredLanguage: 'french',
  passportName: 'My Name',
  passportNumber: '1212323',
  preferredCurrency: 'Euro',
  residentialAddress: 'Delta state',
  rememberProfile: false
};
exports.missingRequiredField = missingRequiredField;
const user = {
  firstName: 'Samuel',
  lastName: 'koroh',
  email: 'user1@gmail.com',
  password: 'Ice5m5am0a843r03'
};
exports.user = user;
const managerUser = {
  firstName: 'Line',
  lastName: 'Manager',
  email: 'manager1@gmail.com',
  password: 'manager1234',
  gender: 'Male',
  preferredLanguage: 'french',
  passportName: 'My Name',
  passportNumber: '1212323',
  preferredCurrency: 'Euro',
  residentialAddress: 'Delta state',
  rememberProfile: true
};
exports.managerUser = managerUser;
const user4 = {
  id: 4,
  firstName: 'Samuel',
  lastName: 'koroh',
  email: 'user4@gmail.com',
  password: 'Ice5m5am0a843r03',
  roleId: 5
};
exports.user4 = user4;
const oneWayTrip = {
  source: 'Lagos',
  tripType: 'one-way',
  destination: 'Abuja',
  travelDate: new Date('2035-01-01'),
  returnDate: new Date('2035-01-01'),
  reason: 'reason',
  accommodation: 'accommodation',
  gender: 'female',
  preferredLanguage: 'french',
  passportName: 'My Name',
  passportNumber: '1212323',
  preferredCurrency: 'Euro',
  residentialAddress: 'Delta state',
  rememberProfile: false
};
exports.oneWayTrip = oneWayTrip;
const oneWayTrip2 = {
  source: 'Lagos',
  tripType: 'one-way',
  destination: 'Abuja',
  travelDate: new Date('2034-01-01'),
  returnDate: new Date('2034-01-01'),
  reason: 'reason',
  accommodation: 'accommodation',
  gender: 'female',
  preferredLanguage: 'french',
  passportName: 'My Name',
  passportNumber: '1212323',
  preferredCurrency: 'Euro',
  residentialAddress: 'Delta state',
  rememberProfile: false
};
exports.oneWayTrip2 = oneWayTrip2;
const testRequest = {
  source: 'Lagos',
  tripType: 'one-way',
  destination: 'Abuja',
  travelDate: Date.now(),
  returnDate: Date.now(),
  reason: 'reason',
  accommodation: 'accommodation',
  userId: 4
};
exports.testRequest = testRequest;
const department = {
  department: 'devOps',
  manager: 5,
  createdAt: new Date(),
  updatedAt: new Date()
};
exports.department = department;
const userDepartment = {
  userId: 4,
  departmentId: 10,
  createdAt: new Date(),
  updatedAt: new Date()
};
exports.userDepartment = userDepartment;
const returnRequest = {
  source: 'Lagos',
  destination: 'Abuja',
  tripType: 'return',
  travelDate: '10/02/2019',
  returnDate: '01/01/2018',
  reason: 'Work',
  accommodation: 'Radison Blu',
  gender: 'female',
  preferredLanguage: 'french',
  passportName: 'My Name',
  passportNumber: '1212323',
  preferredCurrency: 'Euro',
  residentialAddress: 'Delta state',
  rememberProfile: false
};
exports.returnRequest = returnRequest;
const tripRequest = {
  source: 'Abuja',
  tripType: 'one-way',
  destination: 'Uyo',
  travelDate: new Date('2036-01-01'),
  reason: 'reason-it',
  accommodation: 'accommodation-1s',
  gender: 'female',
  preferredLanguage: 'french',
  passportName: 'My Name',
  passportNumber: '1212323',
  preferredCurrency: 'Euro',
  residentialAddress: 'Delta state',
  rememberProfile: true
};
exports.tripRequest = tripRequest;
const noProfileRequest = {
  source: 'Abuja',
  tripType: 'one-way',
  destination: 'Uyo',
  travelDate: Date.now(),
  reason: 'reason-it',
  accommodation: 'accommodation-1s',
  rememberProfile: false
};
exports.noProfileRequest = noProfileRequest;
const user1 = {
  id: 1,
  email: 'earl@ragner.com',
  firstName: 'John',
  lastName: 'lennon',
  password: 'letmebe123'
};
exports.user1 = user1;
const user2 = {
  id: 2,
  email: 'earl@borg.com',
  firstName: 'John',
  lastName: 'lennon',
  password: 'letmebe123'
};
exports.user2 = user2;
const user3 = {
  id: 3,
  email: 'earl@ingstad.com',
  firstName: 'John',
  lastName: 'lennon',
  password: 'letmebe123'
};
exports.user3 = user3;
const userDepartments = [{
  userId: 1,
  departmentId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  userId: 2,
  departmentId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
}];
exports.userDepartments = userDepartments;
const departments = [{
  id: 1,
  department: 'devOps',
  manager: 1,
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: 2,
  department: 'devOps',
  manager: 2,
  createdAt: new Date(),
  updatedAt: new Date()
}];
exports.departments = departments;
const commentBody = {
  comment: 'this is a comment'
};
exports.commentBody = commentBody;