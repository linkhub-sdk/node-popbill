var popbill = require('./');

popbill.config({
  LinkID :'TESTER',
  SecretKey : 'SwWxqU+0TErBXy/9TVjIPEnI0VTUMMSQZtJf3Ed8q3I=',
  IsTest : true,
  defaultErrorHandler :  function(Error) {
    console.log('Error Occur : [' + Error.code + '] ' + Error.message);
  }
});

var statementService = popbill.StatementService();

// statementService.getChargeInfo('1234567890', 121,
//   function(response){
//     console.log(response);
//   }, function(error){
//   	console.log(error);
// });
//
// statementService.attachStatement('1234567890', 121, '20160314-01', 121, '20160314-02',
//   function(response){
//     console.log(response);
//   }, function(error){
//   	console.log(error);
// });
//
// statementService.detachStatement('1234567890', 121, '20160314-01', 121, '20160314-02',
//   function(response){
//     console.log(response);
//   }, function(error){
//   	console.log(error);
// });
//
// State = ['200', '3**'];
// ItemCode = [121,122,123,124,125,126];
// QString = ''
//
// statementService.search('1234567890','W','20160701', '20160831', State, ItemCode, 'D', 1, 10,
//   function(response){
//     console.log(response);
//   }, function(error){
//   	console.log(error);
// });
//
// statementService.getBalance('1234567890',
//   function(Point){
//     console.log(Point)
// });
//
// statementService.getUnitCost('1234567890','121',
//   function(Unitcost){
//     console.log(Unitcost)
// });
//
// statementService.checkMgtKeyInUse('1234567890','121','20150810-01',
// 	function(response){
// 		console.log(response);
// 	},function(error){
// 		console.log(error);
// 	});
//
//
// var statement = {
// 	writeDate : '20160310',
// 	purposeType : '영수',
// 	taxType : '과세',
// 	formCode : '',
// 	itemCode : 121,
// 	mgtKey : '20160314-02',
// 	senderCorpNum : '1234567890',
// 	senderCorpName : '공급자 상호',
// 	senderAddr : '공급자 주소',
// 	senderCEOName : '공급자 대표자 성명',
// 	senderTaxRegID : '1234',
// 	senderBizClass : '종목',
// 	senderBizType : '업태',
// 	senderContactName : '담당자명',
// 	senderEmail : 'test@test.com',
// 	senderTEL : '070-7510-3710',
// 	senderHP : '000-111-222',
// 	receiverCorpNum : '8888888888',
// 	receiverCorpName : '공급받는자상호',
// 	receiverCEOName : '공급받는자 대표자 성명',
// 	receiverAddr : '공급받는자 주소',
// 	receiverTaxRegID : '1234',
// 	receiverBizClass : '업종',
// 	receiverBizType : '업태',
// 	receiverContactName : '공급받는자 담당자 성명',
// 	receiverEmail : 'test@test.com',
// 	receiverTEL : '010-1234-1234',
// 	receiverHP : '010-4321-4321-',
// 	supplyCostTotal : '20000',
// 	taxTotal : '2000',
// 	totalAmount : '22000',
// 	serialNum : '1',
// 	remark1 : '비고1',
// 	remark2 : '',
// 	remark3 : '',
// 	businessLicenseYN : false,
// 	bankBookYN : false,
//
// 	detailList : [
// 		{
// 			serialNum : 1,
// 			itemName : '품명',
// 			purchaseDT : '20160309',
// 			qty : '1',
// 			spec : '규격',
// 			supplyCost :'20000', //공급가액
// 			unitCost : '15000',
// 			remark : '비고',
// 			tax : '2000'
// 		},
// 		{
// 			serialNum : 2,
// 			itemName : '품명2'
// 		}
// 	],
//
// 	propertyBag : {
// 		Balance : '2000',
// 		Deposit : '500',
// 		CBalance : '2500'
// 	}
// };
//
// statementService.registIssue('1234567890', statement,
// 	function(response){
// 	 console.log(response)
// 	},
// 	function(response){
//      console.log("[" + response.code + "] " + response.message)
// });
//
//
//
// var statement = {
// 	writeDate : '20160309',
// 	purposeType : '영수',
// 	taxType : '과세',
// 	formCode : '',
// 	itemCode : 121,
// 	mgtKey : '20160309-21',
// 	senderCorpNum : '1234567890',
// 	senderCorpName : '공급자 상호',
// 	senderAddr : '공급자 주소',
// 	senderCEOName : '공급자 대표자 성명',
// 	senderTaxRegID : '',
// 	senderBizClass : '업종',
// 	snederbizType : '업태',
// 	senderContactName : '담당자명',
// 	senderEmail : 'test@test.com',
// 	senderTEL : '070-7510-3710',
// 	senderHP : '000-111-222',
// 	receiverCorpNum : '8888888888',
// 	receiverCorpName : '공급받는자상호',
// 	receiverCEOName : '공급받는자 대표자 성명',
// 	receiverAddr : '공급받는자 주소',
// 	recieverTaxRegID : '',
// 	receiverBizClass : '업종',
// 	recieverBizType : '업태',
// 	receiverContactName : '공급받는자 담당자 성명',
// 	receiverEmail : 'test@test.com',
// 	receiverTEL : '',
// 	receiverHP : '',
// 	supplyCostTotal : '20000',
// 	taxTotal : '2000',
// 	totalAmount : '22000',
// 	serialNum : '1',
// 	remark1 : '',
// 	remark2 : '',
// 	remark3 : '',
// 	businessLicenseYN : false,
// 	bankBookYN : false,
//
// 	detailList : [
// 		{
// 			serialNum : 1,
// 			itemName : '품명',
// 			purchaseDT : '20160309',
// 			qty : '1',
// 			spec : '규격',
// 			supplyCost :'20000', //공급가액
// 			tax : '2000'
// 		},
// 		{
// 			serialNum : 2,
// 			itemName : '품명2'
// 		}
// 	],
//
// 	propertyBag : {
// 		Balance : '2000',
// 		Deposit : '500',
// 		CBalance : '2500'
// 	}
// };
//
// statementService.FAXSend('1234567890', statement, '070-7510-3710', '000-111-222',
// 	function(response){
// 	 console.log(response)
// 	},
// 	function(response){
//      console.log("[" + response.code + "] " + response.message)
//  });
//
//
// var statement = {
// 	writeDate : '20170302',
// 	purposeType : '영수',
// 	taxType : '과세',
// 	formCode : '',
// 	itemCode : 121,
// 	mgtKey : '20170302-06',
// 	senderCorpNum : '1234567890',
// 	senderCorpName : '공급자 상호',
// 	senderAddr : '공급자 주소',
// 	senderCEOName : '공급자 대표자 성명',
// 	senderTaxRegID : '',
// 	senderBizClass : '업종',
// 	senderBizType : '업태',
// 	senderContactName : '담당자명',
// 	senderEmail : 'test@test.com',
// 	senderTEL : '070-7510-3710',
// 	senderHP : '000-111-222',
// 	receiverCorpNum : '8888888888',
// 	receiverCorpName : '공급받는자상호',
// 	receiverCEOName : '공급받는자 대표자 성명',
// 	receiverAddr : '공급받는자 주소',
// 	recieverTaxRegID : '',
// 	receiverBizClass : '업종',
// 	receiverBizType : '업태',
// 	receiverContactName : '공급받는자 담당자 성명',
// 	receiverEmail : 'test@test.com',
// 	receiverTEL : '',
// 	receiverHP : '',
// 	supplyCostTotal : '20000',
// 	taxTotal : '2000',
// 	totalAmount : '22000',
// 	serialNum : '1',
// 	remark1 : '',
// 	remark2 : '',
// 	remark3 : '',
// 	businessLicenseYN : false,
// 	bankBookYN : false,
//
// 	detailList : [
// 		{
// 			serialNum : 1,
// 			itemName : '품명',
// 			purchaseDT : '20150803',
// 			qty : '1',
// 			sepc : '규격',
// 			supplyCost :'20000', //공급가액
// 			tax : '2000'
// 		},
// 		{
// 			serialNum : 2,
// 			itemName : '품명2'
// 		}
// 	],
//
// 	propertyBag : {
// 		Balance : '2000',
// 		Deposit : '500',
// 		CBalance : '2500'
// 	}
// };
//
// statementService.register('1234567890', statement,
// 	function(response){
// 	 console.log(response)
// 	},
// 	function(response){
//      console.log(response)
//  });
//
// statementService.register('1234567890', statement, 'testkorea',
// 	function(response){
// 	 console.log(response)
// 	},
// 	function(response){
//      console.log(response)
//  });
//
// statementService.update('1234567890', '121', '20150810-01', statement,
// 	function(response){
// 		console.log(response)
// 	},
// 	function(response){
// 		console.log(response)
// });
//
//
// statementService.update('1234567890', '121', '20150810-02', statement, 'testkorea',
// 	function(response){
// 		console.log(response);
// 	},
// 	function(response){
// 		console.log(response)
// });
//
//
// statementService.delete('1234567890', '121', '20150810-01',
// 	function(response){
// 		console.log(response)
// 	},
// 	function(response){
// 		console.log(response)
// });
//
//
// statementService.delete('1234567890', '121', '20150810-02', 'testkorea',
// 	function(response){
// 		console.log(response);
// 	},
// 	function(response){
// 		console.log(response)
// });
//
// statementService.issue('1234567890', 121, '20160314-23', 'memo', '', '',
// 	function(response){
// 		console.log(response);
// 	},
// 	function(response){
// 		console.log(response)
// 	});
//
// statementService.issue('1234567890','121', '20150810-07', '메모', 'testkorea',
// 	function(response){
// 		console.log(response);
// 	},
// 	function(response){
// 		console.log(response)
// 	});
//
// statementService.issue('1234567890','121', '20150810-08', '메모',
// 	function(response){
// 		console.log(response);
// 	},
// 	function(response){
// 		console.log(response)
// 	});
//
// statementService.cancel('1234567890','121', '20150810-05', '취소 메모', 'testkorea',
// 	function(response){
// 		console.log(response)
// 	}, function(response){
// 		console.log(response)
// 	});
//
// statementService.cancel('1234567890','121', '20150810-04', '취소 메모',
// 	function(response){
// 		console.log(response)
// 	}, function(response){
// 		console.log(response)
// 	});
//
// statementService.delete('1234567890','121', '20150810-03',
// 	function(response){
// 		console.log(response)
// 	}, function(error){
// 		console.log(error)
// 	});
//
// statementService.delete('1234567890','121', '20150810-05', 'testkorea',
// 	function(response){
// 		console.log(response)
// 	}, function(error){
// 		console.log(error)
// 	});
//
//
// statementService.getURL('1234567890', 'SBOX', 'testkorea',
// 	function(url){
// 		console.log(url)
// 	},
// 	function(response){
// 		console.log(response)
// 	});
//
// statementService.sendEmail('1234567890', '121', '20150810-06','test@test.com',
// 	function(response){
// 		console.log(response)
// 	},
// 	function(response){
// 		console.log(response)
// 	});
//
// statementService.sendEmail('1234567890', '121', '20150810-09','test@test.com','testkorea',
// 	function(response){
// 		console.log(response)
// 	},
// 	function(response){
// 		console.log(response)
// 	});
//
// statementService.sendSMS('1234567890', '121', '20150810-09','07075103710', '000111222','전자명세서 문자전송 텟1',
// 	function(response){
// 		console.log(response)
// 	},
// 	function(response){
// 		console.log(response)
// 	});
//
// statementService.sendSMS('1234567890', '121', '20150810-09','07075103710', '000111222','전자명세서 문자전송 텟2','testkorea',
// 	function(response){
// 		console.log(response)
// 	},
// 	function(response){
// 		console.log(response)
// 	});
//
// statementService.sendFAX('1234567890', '121', '20150810-09','07075103710', '000111222',
// 	function(response){
// 		console.log(response)
// 	},
// 	function(response){
// 		console.log(response)
// 	});
//
// statementService.sendFAX('1234567890', '121', '20150810-09','07075103710', '000111222','testkorea',
// 	function(response){
// 		console.log(response)
// 	},
// 	function(response){
// 		console.log(response)
// 	});
//
// statementService.getDetailInfo('1234567890', '121', '20150810-09',
// 	function(response){
// 		console.log(response)
// 	},
// 	function(response){
// 		console.log(response)
// 	});
//
//
// statementService.getInfo('1234567890', '121', '20160314-01',
// 	function(response){
// 		console.log(response)
// 	},
// 	function(response){
// 		console.log(response)
// 	});
//
//
// MgtKeyList = ["20150810-09","20150810-08"]
//
// statementService.getInfos('1234567890', '121', MgtKeyList,
// 	function(response){
// 		console.log(response)
// 	},
// 	function(response){
// 		console.log(response)
// 	});
//
// statementService.getLogs('1234567890', '121', '20150810-09',
// 	function(response){
// 		console.log(response)
// 	},
// 	function(response){
// 		console.log(response)
// 	});
// statementService.getPopUpURL('1234567890', '121', '20150810-09',
// 	function(response){
// 		console.log(response)
// 	},
// 	function(response){
// 		console.log(response)
// 	});
// statementService.getPrintURL('1234567890', '121', '20150810-09',
// 	function(response){
// 		console.log(response)
// 	},
// 	function(response){
// 		console.log(response)
// 	});
//
// statementService.getEPrintURL('1234567890', '121', '20150810-09',
// 	function(response){
// 		console.log(response)
// 	},
// 	function(response){
// 		console.log(response)
// 	});
//
// statementService.getMailURL('1234567890', '121', '20150810-09', 'testkorea',
// 	function(response){
// 		console.log(response)
// 	},
// 	function(response){
// 		console.log(response)
// 	});
//
// var MgtKeyList = ['20150810-06', '20150810-07', '20150810-08']
//
// statementService.getMassPrintURL('1234567890', '121', MgtKeyList,
// 	function(response){
// 		console.log(response)
// 	},
// 	function(response){
// 		console.log(response)
// 	});
//
// var corpNum = "1234567890"; // 팝빌회원 사업자번호, '-' 제외 10자리
// var mgtKey = "20170302-06"; // 문서관리번호
// var userID = "testkorea"; // 팝빌회원 아이디
// var FilePaths = ['./테스트.jpg']; // 파일경로
// var fileName = FilePaths[0].replace(/^.*[\\\/]/, ''); // 파일명
//
// statementService.attachFile(corpNum, '121', mgtKey, fileName, FilePaths,
// 	function(result){
// 	  console.log(result)
// 	}, function(Error){
// 	  console.log(Error)
// 	});
//
// statementService.getFiles('1234567890', '121', '20150810-21',
// 	function(response){
// 		console.log(response)
// 	},
// 	function(response){
// 		console.log(response)
// 	});
//
// statementService.deleteFile('1234567890', '121', '20150810-21','E4784A8D-0020-4AB8-987B-F5EAB0085DB0.PBF','testkorea',
// 	function(response){
// 		console.log(response)
// 	},
// 	function(response){
// 		console.log(response)
// 	});
//
// statementService.deleteFile('1234567890', '121', '20150810-21','66492D08-B3BE-440E-9AEE-95AEB5CBF6AF.PBF',
// 	function(response){
// 		console.log(response)
// 	},
// 	function(response){
// 		console.log(response)
// 	});
