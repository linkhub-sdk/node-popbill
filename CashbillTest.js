var popbill = require('./');

popbill.config({
  LinkID :'TESTER',
  SecretKey : 'SwWxqU+0TErBXy/9TVjIPEnI0VTUMMSQZtJf3Ed8q3I=',
  IsTest : true,
  defaultErrorHandler :  function(Error) {
    console.log('Error Occur : [' + Error.code + '] ' + Error.message);
  }
});

var cashbillService = popbill.CashbillService();

cashbillService.getChargeInfo('1234567890',
	function(response){
		console.log(response)
	}, function(error){
		console.log(error)
	});

State = ['100', '200', '3**', '4**'];
TradeType = ['N', 'C'];
TradeUsage = ['P', 'C'];
TaxationType = ['T', 'N'];
QString = '0100001234';

cashbillService.search('1234567890','T', '20160701', '20160831', State, TradeType, TradeUsage, TaxationType, QString, 'D', 1, 30,
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	});


var cashbill = {
	mgtKey : '20170718-11',
	tradeType : '승인거래',
	tradeUsage : '소득공제용',
	taxationType : '과세',

	identityNum : '0101112222',
  orgConfirmNum : '820116333',
  orgTradeDate : '20170710',

	franchiseCorpNum : '1234567890',
	franchiseCorpName : '발행자 상호_수정',
	franchiseCEOName : '발행자 대표자 성명',
	franchiseAddr : '발행자 주소',
	franchiseTEL : '07075103710',

	smssendYN : false,
	customerName : '고객명',
	itemName : '상품명',
	orderNumber : '주문번호',
	email : 'test@test.com',
	hp : '000111222',
	fax : '07075103710',

	supplyCost : '10000',
	tax : '1000',
	serviceFee : '0',
	totalAmount : '11000',
};

cashbillService.registIssue('1234567890',cashbill, "즉시발행 메모",
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	});

cashbillService.getBalance('1234567890',
  function(Point){
    console.log(Point)
  }
);

cashbillService.getURL('1234567890','WRITE', 'testkorea',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	});

cashbillService.getUnitCost('1234567890',
	function(response){
		console.log(response)
	}, function(error){
		console.log(error)
	});

cashbillService.checkMgtKeyInUse('1234567890', '20150807-01',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	})

var cashbill = {
	mgtKey : '20160314-01',
	tradeType : '승인거래',
	tradeUsage : '소득공제용',
	taxationType : '과세',

	identityNum : '0100001234',

	franchiseCorpNum : '1234567890',
	franchiseCorpName : '발행자 상호_수정',
	franchiseCEOName : '발행자 대표자 성명',
	franchiseAddr : '발행자 주소',
	franchiseTEL : '07075103710',

	smssendYN : false,
	customerName : '고객명',
	itemName : '상품명',
	orderNumber : '주문번호',
	email : 'test@test.com',
	hp : '000111222',
	fax : '07075103710',

	supplyCost : '15000',
	tax : '5000',
	serviceFee : '0',
	totalAmount : '20000',
};

cashbillService.register('1234567890',cashbill,
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	});

cashbillService.register('1234567890',cashbill, 'testkorea',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	});

cashbillService.delete('1234567890', '20150810-01',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	});

cashbillService.delete('1234567890', '20150810-02', 'testkorea',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	});

var cashbill2 = {};


cashbillService.update('1234567890', '20150810-01', cashbill,
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	})

cashbillService.update('1234567890', '20150810-01', cashbill,'testkorea',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	})

cashbillService.issue('1234567890', '20160314-01',
 	function(response){
 		console.log(response);
 	}, function(error){
 		console.log(error);
 	});


cashbillService.issue('1234567890', '20150810-01', '발행메모',
 	function(response){
 		console.log(response);
 	}, function(error){
 		console.log(error);
 	});

cashbillService.issue('1234567890', '20150810-02', '발행메모', 'testkorea',
 	function(response){
 		console.log(response);
 	}, function(error){
 		console.log(error);
 	});

cashbillService.cancelIssue('1234567890', '20150810-01', '발행취소메모',
 	function(response){
 		console.log(response);
 	}, function(error){
 		console.log(error);
 	});

cashbillService.cancelIssue('1234567890', '20150810-02', '발행취소메모', 'testkorea',
 	function(response){
 		console.log(response);
 	}, function(error){
 		console.log(error);
 	});

cashbillService.getLogs('1234567890', '20150805-04', 'testkorea',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	});

cashbillService.sendEmail('1234567890', '20160314-01', 'test@test.com',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	})

cashbillService.sendEmail('1234567890', '20150810-01', 'test@test.com','testkorea',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	})

cashbillService.sendSMS('1234567890', '20160314-01', '07075103710', '000111222', '현금영수증 문자메시지 테스트',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	});

cashbillService.sendSMS('1234567890', '20150810-01', '07075103710', '000111222', '현금영수증 문자메시지 테스트', 'testkorea',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	});

cashbillService.sendFAX('1234567890', '20150810-01', '07075103710', '000111222', 'testkorea',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	});

cashbillService.sendFAX('1234567890', '20150810-01', '07075103710', '000111222',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	});

cashbillService.getDetailInfo('1234567890', '20170303-01',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	})

cashbillService.getInfo('1234567890', '20170303-01',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	})

MgtKeyList = ['20150810-01', '20170303-01']

cashbillService.getInfos('1234567890', MgtKeyList,
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	})

cashbillService.getLogs('1234567890', '20170303-01', 'testkorea',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	})

cashbillService.getPrintURL('1234567890', '20170303-01',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	})

cashbillService.getEPrintURL('1234567890', '20170303-01',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	})

cashbillService.getMassPrintURL('1234567890', MgtKeyList, 'testkorea',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	});

cashbillService.getMailURL('1234567890', '20170303-01',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	});

cashbillService.getPopUpURL('1234567890', '20170303-01',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	});

cashbillService.revokeRegistIssue('1234567890', '20171114-13', '806100322', '20171113', false, '', 'testkorea',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	});

cashbillService.revokeRegister('1234567890', '20171113-42', '820116333', '20170711', false, '', true, '1', '3000', '300', '0', '3300',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
});
