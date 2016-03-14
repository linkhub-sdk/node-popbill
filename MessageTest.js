var popbill = require('./');

popbill.config({
  LinkID :'TESTER',
  SecretKey : 'SwWxqU+0TErBXy/9TVjIPEnI0VTUMMSQZtJf3Ed8q3I=',
  IsTest : true,
  defaultErrorHandler :  function(Error) {
    console.log('Error Occur : [' + Error.code + '] ' + Error.message);
  }
});

var messageService = popbill.MessageService();

messageService.getAutoDenyList('1234567890',
  function(response){
    console.log(response);
  },function(error){
	console.log(error);
});

State = [1,2,3,4];
Item = ['SMS','LMS','MMS'];
ReserveYN = false;
SenderYN = false;

messageService.search('1234567890','20160101','20160310',State,Item,true,true,'D',1,10,
  function(Response){
    console.log(Response);
  }, function(err){
	console.log(err);
});

messageService.getUnitCost('1234567890',popbill.MessageType.LMS,
  function(UnitCost){
    console.log('UnitCost is : '  +  UnitCost);
});

messageService.getUnitCost('1234567890',popbill.MessageType.MMS,
  function(UnitCost){
    console.log('UnitCost is : '  +  UnitCost);
});


messageService.getURL('1234567890','BOX','testkorea',
  function(UnitCost){
    console.log(UnitCost);
  },function(error){
	console.log(error);
});

var Messages = [{
		Sender : '07075103710',
		Receiver : '010111222',
		ReceiverName : '수신자명',
		Contents :'문자 메시지 내용1',
	},
	{
		Sender : '07075103710',
		Receiver : '010111222',
		ReceiverName : '수신자명',
		Contents :'문자 메시지 내용2',
	}
]

var Messages = [];

messageService.sendMessage('/SMS','1234567890','07075103710','제목','동보전송 할껍니다',Messages,'',
  function(response){
    console.log(response);
  },function(error){
	console.log(error);
});


messageService.sendSMS('1234567890', '07075103710', '010111222', '수신자명', 'SMS 단건전송', '', true,
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	})

messageService.sendSMS_multi('1234567890', '07075103710', '동보전송을 하고싶소.', Messages,'', false,
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	})

// LMS 단건

messageService.sendLMS('1234567890', '07075103710', '010111222', '수신자명', '메시지 제목입니닷', 'LMS 단건전송', '',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	})

var Messages = [{
		Sender : '07075103710',
		Receiver : '010111222',
		ReceiverName : '수신자명',
		Subject : '메시지 제목1',
		Contents :'문자 메시지 내용1',
	},
	{
		Sender : '07075103710',
		Receiver : '010111222',
		ReceiverName : '수신자명',
		Subject : '메시지 제목2',
		Contents :'문자 메시지 내용2MS 자동인식 단건전송 동해물과 백두산이 마르고 닳도록 하느님이 보호하사 우리나라만사 무궁화 삼천리 화려강산 ',
	}
]

messageService.sendLMS_multi('1234567890', '07075103710', '메시지 제목', 'LMS 대량전송', Messages, '', true,
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	})


messageService.sendXMS('1234567890', '07075103710', '010111222', '수신자명', '문자제목', 'XMS 자동인식 단건전송 동해물과 백두산이 마르고 닳도록 하느님이 보호하사 우리나라만사 무궁화 삼천리 화려강산 대한사람 대한으로', '', false,
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	})

messageService.sendXMS_multi('1234567890', '07075103710', '메시지 제목','자동인식전송 동보내용',Messages, '', false,
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	})


var FilePaths = ['./테스트.jpg']

// MMS 단건전송

messageService.sendMMS('1234567890', '07075103710', '010000112','수신자명', '단건메시지제목', '단건 메시지 내용', FilePaths, '', true,
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	})


messageService.sendMMS_multi('1234567890', '07075103710', '동보제목', '동보내용', Messages, FilePaths, '', false,
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	})

messageService.getMessages('1234567890', '015081013000000005',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	})

messageService.cancelReserve('1234567890', '015081013000000006',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	});


