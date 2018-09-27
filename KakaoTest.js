var popbill = require('./');

popbill.config({
    LinkID: 'TESTER',
    SecretKey: 'SwWxqU+0TErBXy/9TVjIPEnI0VTUMMSQZtJf3Ed8q3I=',
    IsTest: true,
    defaultErrorHandler: function (Error) {
        console.log('Error Occur : [' + Error.code + '] ' + Error.message);
    }
});

var kakaoService = popbill.KakaoService();

kakaoService.getURL('1234567890', 'SENDER', 'testkorea',
    function (url) {
        console.log(url);
    });

kakaoService.listPlusFriendID('1234567890',
    function (response) {
        console.log(response)
    }, function (response) {
        console.log(response)
    });

kakaoService.listPlusFriendID('1234567890', 'test',
    function (response) {
        console.log(response)
    }, function (response) {
        console.log(response)
    });

kakaoService.getSenderNumberList('1234567890',
    function (response) {
        console.log(response)
    }, function (response) {
        console.log(response)
    });

kakaoService.getSenderNumberList('1234567890', 'testkorea',
    function (response) {
        console.log(response)
    }, function (response) {
        console.log(response)
    });

kakaoService.listATSTemplate('1234567890',
    function (response) {
        console.log(response)
    }, function (response) {
        console.log(response)
    });

kakaoService.listATSTemplate('1234567890', 'testkorea',
    function (response) {
        console.log(response)
    }, function (response) {
        console.log(response)
    });

var kakaoReceiver_same = [
    {
        rcv: '010111222',
        rcvnm: '동보_jetty'
    },
    {
        rcv: '010111222',
        rcvnm: '동보_tomcat'
    }
];

var kakaoReceiver_multi = [
    {
        rcv: '010111222',
        rcvnm: '다량_jetty',
        msg: '테스트 템플릿 입니다0',
        altmsg: '알림톡 대체 문자_0'
    },
    {
        rcv: '010111222',
        rcvnm: '다량_tomcat',
        msg: '테스트 템플릿 입니다1',
        altmsg: '알림톡 대체 문자_1'
    }
];

var btns = [
    {
        t: 'WL',
        n: '바로가기',
        u1: 'http://www.popbill.com',
        u2: 'http://www.linkhub.com'
    }
];

ATS
kakaoService.sendATS_one('1234567890', '018080000079', '070-4304-2992', '테스트 템플릿 입니다.', "알림톡 대체 문자", "A", "", "010111222", "partner", 'testkorea', "20180903144355",
    function (receiptNum) {
        console.log("receiptNum is :" + receiptNum);
    }, function (err) {
        console.log(err);
    });

kakaoService.sendATS_same('1234567890', '018080000079', '070-4304-2992', '테스트 템플릿 입니다.', "알림톡 대체 문자", "", "", kakaoReceiver_same, 'testkorea', '20180903144524',
    function (receiptNum) {
        console.log("receiptNum is :" + receiptNum);
    }, function (err) {
        console.log(err);
    });

kakaoService.sendATS_multi('1234567890', '018080000079', '070-4304-2992', "C", "", kakaoReceiver_multi, "testkorea", '20180903144525',
    function (receiptNum) {
        console.log("receiptNum is :" + receiptNum);
    }, function (err) {
        console.log(err);
    });



kakaoService.sendFTS_one('1234567890', '@팝빌', '07043042992', '친구톡 입니다', '대체문자 입니다', 'A', '', '010111222', 'partner', '', btns, 'testkorea', '20180903144520',
    function (receiptNum) {
        console.log("receiptNum is :" + receiptNum);
    }, function (err) {
        console.log(err);
    });

kakaoService.sendFTS_same('1234567890', '@팝빌', '07043042992', '친구톡 동보 입니다', '대체문자 입니다.', 'A' , '',  '', kakaoReceiver_same, btns, 'testkorea', '20180903144521',
    function (receiptNum) {
        console.log("receiptNum is :" + receiptNum);
    }, function (err) {
        console.log(err);
    });

kakaoService.sendFTS_multi('1234567890', '@팝빌', '07043042992', 'A' , '', '', kakaoReceiver_multi, btns, 'testkorea', '20180903144522',
    function (receiptNum) {
        console.log("receiptNum is :" + receiptNum);
    }, function (err) {
        console.log(err);
    });

var FilePath = ['./test.jpg'];

kakaoService.sendFMS_one('1234567890', '@팝빌', '07043042992', '친구톡 이미지 입니다', '대체문자 입니다', 'A', "", "010111222", "popbill", "", "http://linkhub.co.kr", FilePath, btns, 'testkorea', '20180903',
    function (receiptNum) {
        console.log("receiptNum is :" + receiptNum);
    }, function (err) {
        console.log(err);
    });

kakaoService.sendFMS_same('1234567890', '@팝빌', '07043042992', '친구톡 이미지 동보 입니다', '대체문자 입니다', 'A', "", "", "http://linkhub.co.kr", FilePath, kakaoReceiver_same, btns, 'testkorea','20180903145106',
    function (receiptNum) {
        console.log("receiptNum is :" + receiptNum);
    }, function (err) {
        console.log(err);
    });

kakaoService.sendFMS_multi('1234567890', '@팝빌', '07043042992', 'A', "20180409001200", "", "http://linkhub.co.kr", FilePath, kakaoReceiver_multi, btns, 'testkorea','20180903145107',
    function (receiptNum) {
        console.log("receiptNum is :" + receiptNum);
    }, function (err) {
        console.log(err);
    });

kakaoService.getMessages('1234567890', '018040316590600001',
    function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });

kakaoService.getMessages('1234567890', '018040409545300004', 'testkorea',
    function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
kakaoService.getMessagesRN('1234567890', '20180903144355',
    function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
kakaoService.getMessagesRN('1234567890', '20180903144355', 'testkorea',
    function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });

kakaoService.cancelReserve('1234567890', '018090314525300001',
    function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });

kakaoService.cancelReserve('1234567890', '018090314525300001', 'testkorea',
    function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });


kakaoService.cancelReserveRN('1234567890', '20180903145106',
    function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });

kakaoService.cancelReserveRN('1234567890', '20180903145106', 'testkorea',
    function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });

State = [0, 1, 2, 3, 4, 5];
Item = ['ATS', 'FTS', 'FMS'];
SenderYN = false;
Order = 'D';
QString ='popbill';
kakaoService.search('1234567890', '20180301', '20180327', State, Item, '', SenderYN, 1, 10, Order,
    function (Response) {
        console.log(Response);
    }, function (err) {
        console.log(err);
    });

kakaoService.search('1234567890', '20180901', '20180927', State, Item, '', SenderYN, 1, 10, Order, QString, 'testkorea',
    function (Response) {
        console.log(Response);
    }, function (err) {
        console.log(err);
    });


kakaoService.getUnitCost('1234567890', popbill.KakaoType.FTS,
    function (UnitCost) {
        console.log('UnitCost is : ' + UnitCost);
    }, function (err) {
        console.log(err);
    });


kakaoService.getUnitCost('1234567890', popbill.KakaoType.FMS, 'testkorea',
    function (UnitCost) {
        console.log('UnitCost is : ' + UnitCost);
    }, function (err) {
        console.log(err);
    });

kakaoService.getChargeInfo('1234567890', popbill.KakaoType.ATS,
    function (response) {
        console.log(response);
    }, function (response) {
        console.log(response);
    });

kakaoService.getChargeInfo('1234567890', popbill.KakaoType.ATS, 'testkorea',
    function (response) {
        console.log(response);
    }, function (response) {
        console.log(response);
    });