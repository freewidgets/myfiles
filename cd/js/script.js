$(function() {
     function serverTime() {
     var time = null;
     $.ajax({
     url: 'servertime.php',  
     async: true, 
     dataType: 'text',
     success: function(text) {
     time = new Date();
     },
     error: function(http, message, exc) {
     time = new Date();
     }});
     return time;
     }

     function getCountDown() {
     var hour = JFCustomWidget.getWidgetSetting('hour');
     var minute = JFCustomWidget.getWidgetSetting('minute');            
     var until = getNowEDT();
     var setHour = (until.getHours() + parseInt(hour));
     var setMinute = (until.getMinutes() + parseInt(minute));
     var setSecond = until.getSeconds();
     console.log(setHour);
     //var calc =  (24 - until) + until;        
     until.setHours(hour,minute,0,0); // 3PM current day
     // if(getNowEDT() >= until){
     //       until.setHours(hour,minute,0,0); // 3PM next day
     //    }
     console.log(until + "expiry");
     return until;
     }

     function getNowEDT() {
     var now = new Date();
         now.setMinutes(now.getMinutes() + now.getTimezoneOffset() - 4 * 60); // EDT is UTC-4
     console.log(now + "time");
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

    JFCustomWidget.subscribe('ready', function () {  
        init();
    });
 });
