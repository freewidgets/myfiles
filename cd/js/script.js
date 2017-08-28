$(function() {
     function serverTime() {
     var time = null;
     $.ajax({url: 'servertime.php',
     async: false, dataType: 'text',
     success: function(text) {
     time = new Date();
     //console.log(time + "my time");
     },
     error: function(http, message, exc) {
     time = new Date();
     }});
     return time;
    }

     function getCountDown() {
     var hour = JFCustomWidget.getWidgetSetting('hour');
     var minute = JFCustomWidget.getWidgetSetting('minute');          
     var pHour = parseInt(hour);
     var pMinute = parseInt(minute);
     var until = getNowEDT();
     console.log(until + " Today's date");
     // var cTime = null;
     // if (pHour>=24) {
     //    cTime = pHour - 48; //negaive means expired
     // } else {
     //    cTime = pHour + 24;
     // }
     // console.log (cTime);
     // var setHour = (until.getHours() + parseInt(hour));
     // var setMinute = (until.getMinutes() + parseInt(minute));
     // var setSecond = until.getSeconds();
     //console.log(setHour);
     //var calc =  (24 - until) + until;        
     until.setHours(pHour,pMinute,0,0); 
     if(getNowEDT() >= until){
               until.setDate(until.getDate()-1);
               until.setHours(pHour,pMinute,0,0);
               console.log (until + "today > expiry");
         }
     console.log(until + " Expiration Date");
     return until;
     }

     function getNowEDT() {
     var now = new Date();
         now.setMinutes(now.getMinutes() + now.getTimezoneOffset() - 4 * 60); // EDT is UTC-4
     return now;
     }

    function init() {
         var message = JFCustomWidget.getWidgetSetting('message');   
         $('#timer').countdown({
         until: getCountDown(), 
         serverSync: serverTime, 
         format: 'HMS',          
         padZeroes: true,
         timezone: -4,
         alwaysExpire: true,              
         onExpiry: function() {
         //$(this).countdown('option', {until: getCountDown()});
          $('#timer').after("<p>"+message+"</p>"); 
          JFCustomWidget.requestFrameResize({
          height: $('body').height() + 20
        });

      }
    });
    };

   // JFCustomWidget.subscribe('ready', function () {  
        init();
   // });
 });
