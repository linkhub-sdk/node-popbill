var TaxinvoiceService = require('./lib/TaxinvoiceService');
var MessageService = require('./lib/MessageService');
var FaxService = require('./lib/FaxService');
var linkhub = require('linkhub');

var configuration = {LinkID : '',SecretKey : '',IsTest : false};

exports.config = function(config) {
	configuration = config;
}

exports.TaxinvoiceService = function() {
  if(!this._TaxinvoiceService) {
    this._TaxinvoiceService = new TaxinvoiceService(configuration);
  }
  return this._TaxinvoiceService;
}

exports.MessageType = {SMS : 'SMS', LMS : 'LMS', MMS : 'MMS'};

exports.MessageService = function() {
  if(!this._MessageService) {
    this._MessageService = new MessageService(configuration);
  }
  return this._MessageService;
}

exports.FaxService = function() {
  if(!this._FaxService) {
    this._FaxService = new FaxService(configuration);
  }
  return this._FaxService;
}
