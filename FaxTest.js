var popbill = require('./');

popbill.config({
  LinkID :'TESTER',
  SecretKey : 'SwWxqU+0TErBXy/9TVjIPEnI0VTUMMSQZtJf3Ed8q3I=',
  IsTest : true,
  defaultErrorHandler :  function(Error) {
    console.log('Error Occur : [' + Error.code + '] ' + Error.message);
  }
});

var faxService = popbill.FaxService();

// faxService.getChargeInfo('1234567890', 'testkorea',
//   function(response){
//     console.log(response);
//   }, function (error){
//     console.log(error);
//   }
// );
//
// State = [ 1, 2, 3, 4 ];
// ReserveYN = false;
// SenderOnly = false;
//
// faxService.search('1234567890', '20160101', '20160311', State, ReserveYN, SenderOnly, 'D', 1, 5,
// 	function(response){
// 		console.log(response);
// 	}, function(error){
// 		console.log(error);
// });
//
// faxService.getUnitCost('1234567890',
//   function(UnitCost){
//     console.log('UnitCost is : '  +  UnitCost);
// });
//
//
var FilePaths = ['./테스트.jpg', './테스트.jpg']
var Receivers = []

for(var i=0; i<2; i++){
	Receivers.push({receiveName : '수신자성명'+i, receiveNum : '010111222'});
}

var Receivers = [
	{
		receiveName : '수신자성명',
		receiveNum : '111222333',
	},
]
//
// faxService.sendFax('1234567890','07075103710','발신자명','111222333', '수신자명', FilePaths, '2015810200000',
// 	function(receiptNum){
// 		console.log('receiptNum is : ' + receiptNum);
// 	}, function(error){
// 		console.log(error);
// 	});
//
// faxService.sendFax('1234567890','07075103710','발신자명',Receivers, FilePaths, '',
// 	function(receiptNum){
// 		console.log('receiptNum is : ' + receiptNum);
// 	}, function(error){
// 		console.log(error);
// 	});
//
// faxService.getFaxResult('1234567890', '016080913460600001',
// 	function(response){
// 		console.log(response);
// 	},function(error){
// 		console.log(error);
// 	})

// faxService.cancelReserve('1234567890', '015081013071300001',
// 	function(response){
// 		console.log(response);
// 	}, function(error){
// 		console.log(error);
// 	})
