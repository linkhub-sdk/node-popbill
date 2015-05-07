var Util         = require('util');
var BaseService = require('./BaseService');

module.exports = MessageService;
Util.inherits(MessageService,BaseService);

function MessageService(configs) {
  BaseService.call(this,configs);
  this._scopes.push('150');
  this._scopes.push('151');
  this._scopes.push('152');
};

MessageService.prototype.getUnitCost = function(CorpNum,MessageType,success,error) {
  this._executeAction({
    uri : '/Message/UnitCost?Type=' + MessageType,
    CorpNum : CorpNum,
    success : function(response){
      if(success) success(response.unitCost);
    },
    error : error
  });
};