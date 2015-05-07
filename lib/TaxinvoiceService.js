var Util         = require('util');
var BaseService = require('./BaseService');

module.exports = TaxinvoiceService;
Util.inherits(TaxinvoiceService,BaseService);

function TaxinvoiceService(configs) {
  BaseService.call(this,configs);
  this._scopes.push('110');
};

TaxinvoiceService.prototype.getUnitCost = function(CorpNum,success,error) {
  this._executeAction({
    uri : '/Taxinvoice?cfg=UNITCOST',
    CorpNum : CorpNum,
    success : function(response){
      if(success) success(response.unitCost);
    },
    error : error
  });
};