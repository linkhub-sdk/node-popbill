var popbill = require('./');

popbill.config({
    LinkID: 'TESTER',
    SecretKey: 'SwWxqU+0TErBXy/9TVjIPEnI0VTUMMSQZtJf3Ed8q3I=',
    IsTest: true,
    defaultErrorHandler: function (Error) {
        console.log('Error Occur : [' + Error.code + '] ' + Error.message);
    }
});

var faxService = popbill.FaxService();

faxService.getURL('1234567890', 'BOX', 'testkorea',
    function (URL) {
        console.log(URL);
    }, function (error) {
        console.log(error);
    });

faxService.getChargeInfo('1234567890', 'testkorea',
    function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    }
);


State = [1, 2, 3, 4];
ReserveYN = false;
SenderOnly = false;
QString = "공급받는자 상호";

faxService.search('1234567890', '20180901', '20180930', State, ReserveYN, SenderOnly, 'D', 1, 5, QString,
    function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });


faxService.getUnitCost('1234567890',
    function (UnitCost) {
        console.log('UnitCost is : ' + UnitCost);
    });


var FilePaths = ['./테스트.jpg', './테스트.jpg']
var Receivers = []

for (var i = 0; i < 2; i++) {
    Receivers.push({receiveName: '수신자성명' + i, receiveNum: '010111222'});
}

var Receivers = [
    {
        receiveName: '수신자성명',
        receiveNum: '07043042991',
    },
    {
        receiveName: '수신자성명',
        receiveNum: '07043042991',
    },
]

faxService.sendFax('1234567890', '07043042991', '070111222', '수신자명', FilePaths, '', '발신자명', true, 'RequestNum Test', '20180903150553',
    function (receiptNum) {
        console.log('receiptNum is : ' + receiptNum);
    }, function (error) {
        console.log(error);
    });


faxService.sendFax('1234567890', '07043042991', '070111222', '수신자명', FilePaths, '', '발신자명', true, '팩스전송제목',
    function (receiptNum) {
        console.log('receiptNum is : ' + receiptNum);
    }, function (error) {
        console.log(error);
    });

faxService.sendFax('1234567890', '07075103710', Receivers, FilePaths, '',
    function (receiptNum) {
        console.log('receiptNum is : ' + receiptNum);
    }, function (error) {
        console.log(error);
    });


var Receivers = [
    {
        receiveName: '수신자성명',
        receiveNum: '111222333',
    },
    {
        receiveName: '수신자성명',
        receiveNum: '111222333',
    },
]

receiptNum = "018090315112300001";

faxService.resendFax('1234567890', receiptNum, '', '발신자명', '', '', '', '팩스재전송 제목(RequestNum)', '20180903153642',
    function (receiptNum) {
        console.log('receiptNum is : ' + receiptNum);
    }, function (error) {
        console.log(error);
    });
faxService.resendFax('1234567890', receiptNum, '', '발신자명', '', '', '', '팩스재전송 제목',
    function (receiptNum) {
        console.log('receiptNum is : ' + receiptNum);
    }, function (error) {
        console.log(error);
    });

faxService.resendFax('1234567890', receiptNum, '07075103710', '발신자명', Receivers, '',
    function (receiptNum) {
        console.log('receiptNum is : ' + receiptNum);
    }, function (error) {
        console.log(error);
    });


OrgRequestNum = "20180903154412";

faxService.resendFaxRN('1234567890', OrgRequestNum, '07043042992', '김현진', '010111222', '수신자', '20180904153946', 'resendFaxRN title', '20180903154009',
    function (receiptNum) {
        console.log('receiptNum is : ' + receiptNum);
    }, function (error) {
        console.log(error);
    });

faxService.resendFaxRN('1234567890', OrgRequestNum, '', '', '', '', '', '', '20180903154455',
    function (receiptNum) {
        console.log('receiptNum is : ' + receiptNum);
    }, function (error) {
        console.log(error);
    });

faxService.resendFaxRN('1234567890', OrgRequestNum, '20180903154412', 'title test',
    function (receiptNum) {
        console.log('receiptNum is : ' + receiptNum);
    }, function (error) {
        console.log(error);
    });

faxService.getFaxResult('1234567890', '018092715201400001',
    function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    })

faxService.cancelReserve('1234567890', '015081013071300001',
    function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    })


faxService.getFaxResultRN('1234567890', '20180927152011',
    function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });

faxService.cancelReserveRN('1234567890', '20180903154009', 'testkorea',
    function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    })


faxService.getSenderNumberList('1234567890',
    function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });

faxService.getSentListURL('1234567890', 'testkorea',
    function (url) {
        console.log('url is : ' + url);
    }, function (error) {
        console.log(error);
    });

faxService.getSenderNumberMgtURL('1234567890', 'testkorea',
    function (url) {
        console.log('url is : ' + url);
    }, function (error) {
        console.log(error);
    });
