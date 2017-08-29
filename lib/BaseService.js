var Util         = require('util');
var EventEmitter   = require('events').EventEmitter;
var linkhub = require('linkhub');
var http = require('https');
var path = require('path');
var fs = require('fs');
var zlib = require('zlib');

module.exports = BaseService;
Util.inherits(BaseService,EventEmitter);

function BaseService(config) {
  EventEmitter.call(this);

  this._config = config;
  this.ServiceID = this._config.IsTest ? 'POPBILL_TEST' : 'POPBILL';
  this.ServiceURL = this._config.IsTest ? 'popbill-test.linkhub.co.kr' : 'popbill.linkhub.co.kr';

  linkhub.initialize({
    LinkID : this._config.LinkID,
    SecretKey : this._config.SecretKey,
    defaultErrorHandler : this._config.defaultErrorHandler
  });

  this._Linkhub_Token_Cash = {};
  this._scopes = ['member'];
};

BaseService.addMethod = function(object, name, fn){
    var old = object[ name ];
    object[ name ] = function(){
        if ( fn.length == arguments.length )
            return fn.apply( this, arguments );
        else if ( typeof old == 'function' )
            return old.apply( this, arguments );
    };
}

BaseService.prototype._getToken = function(CorpNum,err) {

  var newToken = this._Linkhub_Token_Cash[CorpNum];
  var expired = true;

  if(typeof newToken === 'function') {
    var expiration = new Date(newToken(function(){},err).expiration);
    if(expiration) {
      linkhub.getTime(
        success = function(UTCTime){
          expired = UTCTime > expiration;
        }
      );
    } else {
      expired = false;
    }
  }

  if(expired) {
    newToken = linkhub.newToken(this.ServiceID,CorpNum,this._getScopes(),null);
    this._Linkhub_Token_Cash[CorpNum] = newToken;
  }

  return newToken;

};

BaseService.prototype._getScopes = function() {
  return this._scopes;
}

BaseService.prototype.getPartnerURL = function(CorpNum,TOGO,callback,err) {
  linkhub.getPartnerURL(this._getToken(CorpNum),TOGO,callback,err);
};

BaseService.prototype.getBalance = function(CorpNum,callback,err) {
  linkhub.getBalance(this._getToken(CorpNum),callback,err);
};

BaseService.prototype.getPartnerBalance = function(CorpNum,callback,err) {
  linkhub.getPartnerBalance(this._getToken(CorpNum),callback,err);
};

BaseService.addMethod(BaseService.prototype, 'getPopbillURL', function(CorpNum, TOGO, callback, err){
  this.getPopbillURL(CorpNum,'',TOGO,callback,err);
});

BaseService.addMethod(BaseService.prototype , 'getPopbillURL', function(CorpNum,UserID,TOGO,callback,err) {
  this._executeAction({
    uri : '/?TG=' + TOGO,
    CorpNum : CorpNum,
    UserID : UserID,
    success : function(response){
      if(callback) callback(response.url);
    },
    error : err
  });
});

BaseService.prototype.checkIsMember = function(CorpNum,callback,err) {
  this._executeAction({
    uri : '/Join?CorpNum=' + CorpNum + '&LID=' + this._config.LinkID,
    success : function(response){
      if(callback) callback(response);
    },
    error : err
  });
};

BaseService.prototype.joinMember = function(JoinForm,callback,err) {
  var postData = linkhub.stringify(JoinForm);

  this._executeAction({
    uri : '/Join',
    Method : 'POST',
    Data : postData,
    success : function(response){
      if(callback) callback(response);
    },
    error : err
  });
};

BaseService.prototype.checkID = function(targetID,callback,err){
  this._executeAction({
    uri : '/IDCheck?ID='+targetID,
    Method : 'GET',
    success : function(response){
      if(callback) callback(response);
    },
    error : err
  });
};

BaseService.prototype.listContact = function(CorpNum,callback,err){
  this._executeAction({
    uri : '/IDs',
    Method : 'GET',
    CorpNum : CorpNum,
    success : function(response){
      if(callback) callback(response);
    },
    error : err
  });
};

BaseService.prototype.updateContact = function(CorpNum,UserID,ContactInfo,callback,err){
  var postData = linkhub.stringify(ContactInfo);

  this._executeAction({
    uri : '/IDs',
    Method : 'POST',
    CorpNum : CorpNum,
    UserID : UserID,
    Data : postData,
    success : function(response){
      if(callback) callback(response);
    },
    error : err
  });
};

BaseService.addMethod(BaseService.prototype, 'registContact', function(CorpNum,ContactInfo, callback, err){
  this.registContact(CorpNum,'',ContactInfo,callback,err);
});

BaseService.addMethod(BaseService.prototype, 'registContact', function(CorpNum,UserID,ContactInfo,callback,err){
  var postData = linkhub.stringify(ContactInfo);

  this._executeAction({
    uri : '/IDs/New',
    Method : 'POST',
    CorpNum : CorpNum,
    UserID : UserID,
    Data : postData,
    success : function(response){
      if(callback) callback(response);
    },
    error : err
  });
});

BaseService.prototype.getCorpInfo = function(CorpNum,callback,err){
  this._executeAction({
    uri : '/CorpInfo',
    Method : 'GET',
    CorpNum : CorpNum,
    success : function(response){
      if(callback) callback(response);
    },
    error : err
  });
};

BaseService.addMethod(BaseService.prototype, 'updateCorpInfo', function(CorpNum,CorpInfo, callback, err){
  this.updateCorpInfo(CorpNum,'',CorpInfo,callback,err);
});

BaseService.addMethod(BaseService.prototype, 'updateCorpInfo', function(CorpNum,UserID,CorpInfo,callback,err){
  var postData = linkhub.stringify(CorpInfo);

  this._executeAction({
    uri : '/CorpInfo',
    Method : 'POST',
    CorpNum : CorpNum,
    UserID : UserID,
    Data : postData,
    success : function(response){
      if(callback) callback(response);
    },
    error : err
  });
});


BaseService.prototype._executeAction = function(options) {
  var boundary = '--POPBILL--NODE--';
  var isMultiPart = options.Files ? true : false;
  var CRLF = '\r\n';

  if(!(options.Method)) options.Method = 'GET';

  var headers = {};
  var Token = function(callback) {callback(null);};

  if(options.CorpNum) {
    Token = this._getToken(options.CorpNum);
  }
  var _this = this;

  Token(function(token) {

    if(token) headers['Authorization'] =  'Bearer ' + token.session_token;
    if(options.UserID) headers['x-pb-userid'] = options.UserID;
    if(false == (options.Method == 'GET' || options.Method == 'POST')) headers['X-HTTP-Method-Override'] = options.Method;

    if(isMultiPart) headers['Content-Type'] = 'multipart/form-data;charset=utf-8; boundary=' + boundary;
    else {
      headers['Content-Type'] = 'application/json;charset=utf-8';
    }

    headers['Accept-Encoding'] = 'gzip,deflate';

    var requestOpt = {
      host : _this.ServiceURL,
      path : options.uri,
      method : options.Method == 'GET' ? 'GET' : 'POST',
      headers : headers
    }

    var req = _this._makeRequest(
      requestOpt,
      function(response){
        if(options.success) options.success(response);
      },
      (typeof options.error === 'function') ? options.error : _this._config.defaultErrorHandler
    );

    if(options.Method != 'GET' && options.Data) {
      if(isMultiPart) {
        req.write(CRLF + '--' + boundary + CRLF);
        req.write('Content-Disposition: form-data; name="form"' + CRLF);
        req.write(CRLF);
        req.write(options.Data);
        req.write(CRLF);
      }else {
        req.write(options.Data);
      }

    }

    if(isMultiPart) {

      var fnCall = function(X) {

        if(X < options.Files.length) {
          var fileName = path.basename(options.Files[X].fileName);

          fs.readFile(options.Files[X].fileName,function(err,data){
            if(err) {
              _this._throwError(-99999999,'파일을 읽을 수 없습니다. ['+options.Files[X].fileName+']',options.error);
              return;
            }
            req.write('--' + boundary + CRLF);
            req.write('Content-Disposition: form-data; name="'+options.Files[X].fieldName+'"; filename="'+fileName+'";' + CRLF,'utf8');
            req.write('Content-Type: Application/octet-stream' + CRLF);
            req.write(CRLF);
            req.write(data);
            req.write(CRLF);
            fnCall(X+1);
          });

        }
        else {
          //end of Multipart
          req.write('--' + boundary + '--' + CRLF + CRLF);
          req.end();
        }
      };
      fnCall(0);
    }
    else {
      req.end();
    }

  },options.error);
};

BaseService.prototype._makeRequest = function(options,success,error) {
  var request = http.request(options,
    function(response) {
      var buf = new Buffer(0);
      //Gzip Compressed Response stream pipe
      if (response.headers['content-encoding'] == 'gzip') {
        var gzip = zlib.createGunzip();
        response.pipe(gzip);
        gzip.on('data',function(chunk) {
          buf = Buffer.concat([buf,chunk]);
        });

        gzip.on('end',function(){
          if(response.statusCode == '200'){
            success(JSON.parse(buf));
          }
          else if(error) {
            error(JSON.parse(buf));
          }
        });
      } else {
        response.on('data',function(chunk) {
          buf = Buffer.concat([buf,chunk]);
        });

        response.on('end',function(){
          if(this.statusCode == '200'){
            success(JSON.parse(buf));
          }
          else if(error) {
            error(JSON.parse(buf));
          }
        });
      }
    }
  );

  request.on('error',function(err){
    if(err.code != 'ECONNRESET')
      console.error(err);
  });
  return request;
};

BaseService.prototype._stringify = function(obj) {
  return JSON.stringify(obj,function(key,value){return !value ? undefined : value;});
};

BaseService.prototype._throwError = function(Code,Message,err) {
  if(err)
    err({code : Code , message : Message});
  else if (typeof this._config.defaultErrorHandler === 'function')
    this._config.defaultErrorHandler({code:Code,message:Message});
}
