const model = require('mongoose').model;

let SchemaInstance = require('./instance');
let SchemaLog = require('./log');
let SchemaUser = require('./user');
let SchemaCharacter = require('./character');

module.exports = {
    Instance: model('instance', SchemaInstance),
    Log: model('log', SchemaLog),
    User: model('user', SchemaUser),
    Character: model('character', SchemaCharacter)
};