var popbill = require("./");

popbill.config({
  LinkID: "TESTER",
  SecretKey: "SwWxqU+0TErBXy/9TVjIPEnI0VTUMMSQZtJf3Ed8q3I=",
  IsTest: true,
  defaultErrorHandler: function (Error) {
    console.log("Error Occur : [" + Error.code + "] " + Error.message);
  },
});

var accountCheckService = popbill.AccountCheckService();

// accountCheckService.getChargeInfo('1234567890',
// 	function(response){
// 		console.log(response);
// 	}, function(error){
// 		console.log(error);
// 	});

// accountCheckService.getChargeInfo('1234567890', 'testkorea',
// 	function(response){
// 		console.log(response);
// 	}, function(error){
// 		console.log(error);
// 	});

// accountCheckService.getChargeInfo('1234567890','성명', '',
// 	function(response){
// 		console.log(response);
// 	}, function(error){
// 		console.log(error);
// 	});

// accountCheckService.getChargeInfo('1234567890','실명', 'testkorea',
// 	function(response){
// 		console.log(response);
// 	}, function(error){
// 		console.log(error);
// 	});

// 	accountCheckService.getUnitCost('1234567890',
// 	function(response){
// 		console.log('Unitcost : ' + response);
// 	}, function(error){
// 		console.log(error);
// 	});

// 	accountCheckService.getUnitCost('1234567890','성명',
// 	function(response){
// 		console.log('Unitcost : ' + response);
// 	}, function(error){
// 		console.log(error);
// 	});

// 	accountCheckService.getUnitCost('1234567890','실명',
// 	function(response){
// 		console.log('Unitcost : ' + response);
// 	}, function(error){
// 		console.log(error);
// 	});

// 	accountCheckService.getBalance('1234567890',
// 	function(response){
// 		console.log('Balance : ' + response);
// 	}, function(error){
// 		console.log(error);
// 	});

// accountCheckService.checkAccountInfo('1234567890', '0004', '1234567890',
// 	function(response){
// 		console.log(response);
// 	}, function(error){
// 		console.log(error);
// 	});

// accountCheckService.checkDepositorInfo('1234567890', '0004', '1234567890','B','1234567890',
// 	function(response){
// 		console.log(response);
// 	}, function(error){
// 		console.log(error);
// 	});

// accountCheckService.getRefundInfo(
//   "1234567890",
//   "023040000017",
//   function (response) {
//     console.log("success-----");
//     console.log(response);
//   },
//   function (error) {
//     console.log("failed-----");
//     console.log(error);
//   }
// );
// accountCheckService.getRefundableBalance(
//   "1234567890",
//   function (response) {
//     console.log("success-----");
//     console.log(response);
//   },
//   function (error) {
//     console.log("failed-----");
//     console.log(error);
//   }
// );
// accountCheckService.quitMember(
//   "0000007005",
//   "회원탈퇴 테스트합니다",
//   "test_7005",
//   function (response) {
//     console.log("success-----");
//     console.log(response);
//   },
//   function (error) {
//     console.log("failed-----");
//     console.log(error);
//   }
// );
