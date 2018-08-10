var popbill = require('./');

popbill.config({
  LinkID :'TESTER',
  SecretKey : 'SwWxqU+0TErBXy/9TVjIPEnI0VTUMMSQZtJf3Ed8q3I=',
  IsTest : true,
  defaultErrorHandler :  function(Error) {
    console.log('Error Occur : [' + Error.code + '] ' + Error.message);
  }
});

var taxinvoiceService = popbill.TaxinvoiceService();

SDate = '20171101';
EDate = '20171231';
State = ['3**','6**'];
Type = ['N', 'M'];
TaxType = ['T','N','Z'];
IssueType = ['N','R','T'];
LateOnly = null;
PageNum = 1
PerPage = 5
TaxRegIDType = 'S'
TaxRegIDYN = '';
TaxRegID = '';
QString = '';
InterOPYN = '';

taxinvoiceService.search('1234567890',popbill.MgtKeyType.SELL, 'W', SDate, EDate, State, Type, TaxType, LateOnly, 'D', PageNum, PerPage, TaxRegIDType, TaxRegIDYN, TaxRegID, QString, InterOPYN, 'testkorea', IssueType,
  function(response){
    console.log(response.total);
  }, function(error){
    console.log(error);
});

taxinvoiceService.getChargeInfo('1234567890', 'testkorea',
  function(response){
    console.log(response);
  }, function(result){
    console.log(result);
  });

Taxinvoice = {
    writeDate : '20160314',
    chargeDirection : '정과금',
    issueType : '정발행',
    purposeType : '영수',
    issueTiming : '직접발행',
    taxType : '과세',
    invoicerCorpNum : '1234567890',
    invoicerMgtKey : '20160314-10',
    invoicerTaxRegID : '1234',
    invoicerCorpName : '공급자 상호',
    invoicerCEOName : '대표자 성명',
    invoicerAddr : '공급자 주소',
    invoicerBizClass : '공급자 업종',
    invoicerBizType : '공급자 업태',
    invoicerContactName : '공급자 담당자명',
    invoicerTEL : '070-7510-3710',
    invoicerHP : '010-000-111',
    invoicerEmail : 'test@test.com',
    invoicerSMSSendYN : false,
    invoiceeType : '사업자',
    invoiceeCorpNum : '8888888888',
    invoiceeMgtKey : '',
    invoiceeTaxRegID : '1234',
    invoiceeCorpName : '공급받는자 상호',
    invoiceeCEOName : '공급받는자 대표자 성명',
    invoiceeAddr : '공급받는자 주소',
    invoiceeBizClass : '공급받는자 업종',
    invoiceeBizType : '공급받는자 업태',
    invoiceeContactName1 : '공급받는자 담당자명',
    invoiceeTEL1 : '010-111-222',
    invoiceeHP1 : '070-111-222',
    invoiceeEmail1 : 'test@test.com',
    invoiceeSMSSendYN : false,
    taxTotal : '2000',
    supplyCostTotal : '20000',
    totalAmount : '22000',
    //modifyCode
    //originalTaxinvoiceKey
    serialNum : '123',
    cash : '',
    chkBill : '',
    note : '',
    credit : '',
    remark1 : '비고1',
    remark2 : '',
    remark3 : '',
    kwon : '',
    ho : '',
    businessLicenseYN : false,
    bankBookYN : false,

    detailList : [
    {
      serialNum : 1,
      itemName : '품명',
      purchaseDT : '20160309',
      unitCost : '2000',
      qty : '1',
      spec : 'Box',
      supplyCost :'20000', //공급가액
      tax : '2000',
      remark : '비고'
    },
    {
      serialNum : 2,
      itemName : '품명2'
    },
    ],

    addContactList : [
    {
      serialNum : 1,
      contactName : '담당자 성명',
      email : 'test@test.com',
    },
    {
      serialNum : 2,
      contactName : '담당자 성명2',
      email : 'test@test.com',
    },
    ]
  };

taxinvoiceService.registIssue('1234567890', Taxinvoice, false, false, "메모", "", "", "testkorea",
  function(response){
    console.log(response);
  },
  function(error){
    console.log(error);
  });

taxinvoiceService.attachStatement('1234567890', popbill.MgtKeyType.SELL, "20160314-01", 121, "20160310-07",
  function(response){
    console.log(response)
  },
  function(error){
    console.log(error);
  });

taxinvoiceService.detachStatement('1234567890', popbill.MgtKeyType.SELL, "20160314-01", 121, "20160310-07",
  function(response){
    console.log(response)
  },
  function(error){
    console.log(error);
  });



taxinvoiceService.checkID('testkorea',
  function(response){
    console.log("[" + response.code + "] " + response.message);
}, function(error){
 console.log(error);
});

taxinvoiceService.listContact('1234567890',
  function(response){
    console.log(response[0]);
}, function(error){
 console.log(error);
});


var contactInfo =  {
  personName : '담당자명0309',
  tel : '070-7510-3710',
  hp : '010-1234-1234',
  email : 'code@linkhub.co.kr',
  fax : '070-1234-1234',
  searchAllAllowYN : true,
  mgrYN : true
};

taxinvoiceService.updateContact('1234567890', 'testkorea', contactInfo,
  function(result){
    console.log(result);
  }, function(error){
    console.log(error);
  }
);

var newContactInfo =  {
  id : 'testkorea0304',
  pwd : 'popbill',
  personName : '담당자명0309',
  tel : '070-7510-3710',
  hp : '010-1234-1234',
  email : 'frenchofkiss@gmail.com',
  fax : '070-1234-1234',
  searchAllAllowYN : true,
  mgrYN : true
};

taxinvoiceService.registContact('1234567890', 'testkorea', newContactInfo,
  function(result){
    console.log(result);
  }, function(error){
    console.log(error);
  }
);

taxinvoiceService.getCorpInfo('1234567890',
  function(result){
    console.log(result);
  }, function(error){
    console.log(error);
  }
);

var corpInfo = {
  ceoname : "대표자성명0303",
  corpName : "업체명",
  addr : "영동대로 517",
  bizType : "업태",
  bizClass : "종목"
};

taxinvoiceService.updateCorpInfo('1234567890',corpInfo,
  function(result){
    console.log(result);
  }, function(error){
    console.log(error);
  }
);

taxinvoiceService.getCertificateExpireDate('1234567890',
  function(Point){
    console.log(Point)
  }
);

taxinvoiceService.getBalance('1234567890',
  function(Point){
    console.log(Point)
  }
);

taxinvoiceService.getPartnerBalance('1234568790',
  function(Point){
    console.log(Point)
  }
);

taxinvoiceService.getUnitCost('1234567890',
  function(UnitCost){
    console.log('UnitCost is : '  +  UnitCost);
},function(error){
	console.log(error);
});

taxinvoiceService.getPopbillURL('1234567890','CERT',
  function(url){
    console.log('url is : '  +  url);
  }, function(error){
    console.log(error);
  });


taxinvoiceService.checkIsMember('1234567890',
  function(response){
    console.log(response);
}, function(error){
	console.log(error);
});

taxinvoiceService.checkMgtKeyInUse('1234567890',popbill.MgtKeyType.SELL, '20150805-01',
  function(response){
    console.log(response);
}, function(error){
	console.log(error);
});



var joinInfo =  {
  LinkID : 'TESTER',
  CorpNum : '1231212312',
  CEOName : '대표자성명',
  CorpName : '테스트상호',
  Addr : '주소',
  BizType : '업태',
  BizClass : '업종',
  ContactName : '담당자 성명',
  ContactEmail : 'test@test.com',
  ContactTEL : '070-7510-6766',
  ID : 'userid',
  PWD : 'this_is_password'
};

taxinvoiceService.joinMember(joinInfo,
  function(result){
    console.log(result);
});

 var Taxinvoice = {
    writeDate : '20160314',
    chargeDirection : '정과금',
    issueType : '정발행',
    purposeType : '영수',
    issueTiming : '직접발행',
    taxType : '과세',
    invoicerCorpNum : '1234567890',
    invoicerMgtKey : '20160314-25',
    invoicerTaxRegID : '1234',
    invoicerCorpName : '공급자 상호',
    invoicerCEOName : '대표자 성명',
    invoicerAddr : '공급자 주소',
    invoicerBizClass : '공급자 업종',
    invoicerBizType : '공급자 업태',
    invoicerContactName : '공급자 담당자명',
    invoicerTEL : '070-7510-3710',
    invoicerHP : '010-000-111',
    invoicerEmail : 'test@test.com',
    invoicerSMSSendYN : false,
    invoiceeType : '사업자',
    invoiceeCorpNum : '8888888888',
    invoiceeMgtKey : '',
    invoiceeTaxRegID : '',
    invoiceeCorpName : '공급받는자 상호',
    invoiceeCEOName : '공급받는자 대표자 성명',
    invoiceeAddr : '공급받는자 주소',
    invoiceeBizClass : '공급받는자 업종',
    invoiceeBizType : '공급받는자 업태',
    invoiceeContactName1 : '공급받는자 담당자명',
    invoiceeTEL1 : '010-111-222',
    invoiceeHP1 : '070-111-222',
    invoiceeEmail1 : 'test@test.com',
    invoiceeSMSSendYN : false,
    taxTotal : '2000',
    supplyCostTotal : '20000',
    totalAmount : '22000',
    //modifyCode
    //originalTaxinvoiceKey
    serialNum : '123',
    cash : '',
    chkBill : '',
    note : '',
    credit : '',
    remark1 : '',
    remark2 : '',
    remark3 : '',
    kwon : '',
    ho : '',
    businessLicenseYN : false,
    bankBookYN : false,

    detailList : [
    {
      serialNum : 1,
      itemName : '품명',
      purchaseDT : '20150803',
      qty : '1',
      unitCost : '20000',
      spec : '규격',
      supplyCost :'20000', //공급가액
      tax : '2000'
    },
    {
      serialNum : 2,
      itemName : '품명2'
    },
    ],

    addContactList : [
    {
      serialNum : 1,
      contactName : '담당자 성명',
      email : 'test@test.com',
    },
    {
      serialNum : 2,
      contactName : '담당자 섬염2',
      email : 'test@test.com',
    },
    ]
  };

taxinvoiceService.register('1234567890', Taxinvoice,
  function(response){
    console.log(response)
  },
  function(error){
    console.log(error);
  });


taxinvoiceService.register('1234567890', Taxinvoice, 'testkorea',
  function(response){
    console.log(response)
  },
  function(error){
    console.log(error);
  });


taxinvoiceService.register('1234567890', Taxinvoice, 'testkorea', true,
  function(response){
    console.log(response)
  },
  function(error){
    console.log(error);
  });

taxinvoiceService.update('1234567890', popbill.MgtKeyType.SELL, '20150810-03', Taxinvoice,
  function(response){
    console.log(response)
  },
  function(error){
    console.log(error);
  });


taxinvoiceService.update('1234567890', popbill.MgtKeyType.SELL, '20150805-11', Taxinvoice, 'testkorea',
  function(response){
    console.log(response)
  },
  function(error){
    console.log(error);
  });

taxinvoiceService.delete('1234567890', popbill.MgtKeyType.SELL, '20150810-01',
  function(response){
    console.log(response);
  }, function(result){
    console.log(result);
  })


taxinvoiceService.delete('1234567890', popbill.MgtKeyType.SELL, '20150810-02', 'testkorea',
  function(response){
    console.log(response);
  }, function(result){
    console.log(result);
  })

taxinvoiceService.getInfo('1234567890', popbill.MgtKeyType.SELL, '20160314-01',
  function(response){
    console.log(response)
  },
  function(error){
    console.log(error);
  });

var MgtKeyList = ['20150810-01', '20150810-02', '20150810-03'];

taxinvoiceService.getInfos('1234567890', popbill.MgtKeyType.SELL, MgtKeyList,
  function(response){
    console.log(response)
  },
  function(error){
    console.log(error);
  });

taxinvoiceService.getDetailInfo('1234567890', popbill.MgtKeyType.SELL, '20150810-03',
  function(response){
    console.log(response)
  },
  function(error){
    console.log(error);
  });

taxinvoiceService.getLogs('1234567890', popbill.MgtKeyType.SELL, '20150810-03',
  function(response){
    console.log(response)
  },
  function(error){
    console.log(error);
  });

var FilePaths = ['./테스트.jpg']; // 파일경로
var fileName = FilePaths[0].replace(/^.*[\\\/]/, ''); // 파일명

 taxinvoiceService.attachFile('1234567890', popbill.MgtKeyType.SELL, '20150810-03', fileName, FilePaths,
  function(response){
    console.log(response)
  },
  function(error){
    console.log(error);
  });

 taxinvoiceService.getFiles('1234567890', popbill.MgtKeyType.SELL, '20150810-03',
  function(response){
    console.log(response)
  },
  function(error){
    console.log(error);
  });


taxinvoiceService.deleteFile('1234567890', popbill.MgtKeyType.SELL, '20150810-03', '3FD50CE0-DA61-4A43-A8E2-73D246D9A928.PBF','testkorea',
  function(response){
    console.log(response)
  },
  function(error){
    console.log(error);
  });

taxinvoiceService.send('1234567890', popbill.MgtKeyType.SELL, '20150810-03', '발행예정 메모',
  function(response){
    console.log(response);
  }, function(result){
    console.log(result);
  })

taxinvoiceService.send('1234567890', popbill.MgtKeyType.SELL, '20150810-04', '발행예정 메모', 'testkorea',
  function(response){
    console.log(response);
  }, function(result){
    console.log(result);
  })

taxinvoiceService.cancelSend('1234567890', popbill.MgtKeyType.SELL, '20150810-03', '발행예정 취소메모',
  function(response){
    console.log(response);
  }, function(result){
    console.log(result);
  })

taxinvoiceService.cancelSend('1234567890', popbill.MgtKeyType.SELL, '20150810-04', '발행예정 취소메모', 'testkorea',
  function(response){
    console.log(response);
  }, function(result){
    console.log(result);
  })

taxinvoiceService.issue('1234567890', popbill.MgtKeyType.SELL, '20160314-25', 'memo', '', false, 'testkorea',
  function(response){
    console.log(response);
  }, function(result){
    console.log(result);
  });

taxinvoiceService.issue('1234567890', popbill.MgtKeyType.SELL, '20150810-10', '발행메모',
  function(response){
    console.log(response);
  }, function(result){
    console.log(result);
  })

taxinvoiceService.issue('1234567890', popbill.MgtKeyType.SELL, '20150810-11','발행메모', 'testkorea',
  function(response){
    console.log(response);
  }, function(result){
    console.log(result);
  })

taxinvoiceService.cancelIssue('1234567890', popbill.MgtKeyType.SELL, '20150810-07', '발행취소 메모',
  function(response){
    console.log(response);
  }, function(result){
    console.log(result);
  })

taxinvoiceService.sendToNTS('1234567890', popbill.MgtKeyType.SELL, '20150810-10',
  function(response){
    console.log(response);
  }, function(result){
    console.log(result);
  })


taxinvoiceService.cancelIssue('1234567890', popbill.MgtKeyType.SELL, '20150810-05', '발행취소 메모', 'testkorea',
  function(response){
    console.log(response);
  }, function(result){
    console.log(result);
  })


taxinvoiceService.cancelIssue('1234567890', popbill.MgtKeyType.SELL, '20150805-14', '발행취소 메모', 'testkorea',
  function(response){
    console.log(response);
  }, function(result){
    console.log(result);
  })

 taxinvoiceService.sendEmail('1234567890', popbill.MgtKeyType.SELL, '20150810-11', 'test@test.com', 'testkorea',
  function(response){
    console.log(response);
  }, function(result){
    console.log(result);
  })

 taxinvoiceService.sendSMS('1234567890', popbill.MgtKeyType.SELL, '20150810-11', '070750173710', '000111222', '전자세금계산서 문자메시지 전송 테스트2',
  function(response){
    console.log(response);
  }, function(result){
    console.log(result);
  })

 taxinvoiceService.sendFAX('1234567890', popbill.MgtKeyType.SELL, '20150810-11', '070750173710', '111222333','testkorea',
  function(response){
    console.log(response);
  }, function(result){
    console.log(result);
  })

taxinvoiceService.getURL('1234567890', 'SBOX',
  function(response){
    console.log(response);
  }, function(result){
    console.log(result);
  })

taxinvoiceService.getPopUpURL('1234567890', popbill.MgtKeyType.SELL, '20150810-11',
  function(response){
    console.log(response);
  }, function(result){
    console.log(result);
  })

var MgtKeyList = ['20150810-11', '20150810-10']

taxinvoiceService.getPrintURL('1234567890', popbill.MgtKeyType.SELL, '20150810-11',
  function(response){
    console.log(response);
  }, function(result){
    console.log(result);
  })

taxinvoiceService.getEPrintURL('1234567890', popbill.MgtKeyType.SELL, '20150810-11',
  function(response){
    console.log(response);
  }, function(result){
    console.log(result);
  })

taxinvoiceService.getMassPrintURL('1234567890', popbill.MgtKeyType.SELL, MgtKeyList,
  function(response){
    console.log(response);
  }, function(result){
    console.log(result);
  })

taxinvoiceService.getMailURL('1234567890', popbill.MgtKeyType.SELL, '20150810-11',
  function(response){
    console.log(response);
  }, function(result){
    console.log(result);
  })

taxinvoiceService.getEmailPublicKeys('1234567890',
  function(response){
    console.log(response);
  }, function(result){
    console.log(result);
  })

taxinvoiceService.getPartnerURL('1234567890','CHRG',
  function(url){
    console.log('url is : '  +  url);
  }, function(error){
    console.log(error);
  });


taxinvoiceService.checkCertValidation('1234567890',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
  });

taxinvoiceService.assignMgtKey('1234567890', popbill.MgtKeyType.SELL, '018081010174100001', '20180810', '',
    function (response) {
        console.log(response);
    }, function (error) {
        console.log(error)
    });


taxinvoiceService.listEmailConfig('1234567890',
    function(response){
        console.log(response);
    }, function(error){
        console.log(error);
    });

taxinvoiceService.updateEmailConfig('1234567890', "TAX_ACCEPT", false, "",
    function(response){
        console.log(response);
    }, function(error){
        console.log(error);
    });