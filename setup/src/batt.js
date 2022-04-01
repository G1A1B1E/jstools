
         function updateBatteryInfo(battery) {
            document.getElementById('in-charge').innerHTML = battery.charging ? 'Yes' : 'No';
            document.getElementById('charging-time').innerHTML = battery.chargingTime;
            document.getElementById('discharging-time').innerHTML = battery.dischargingTime;
            document.getElementById('battery-level').innerHTML = battery.level;
         }

         function eventHandler(event) {
            var log = document.getElementById('log');

            log.innerHTML = 'Event "' + event.type + '" fired<br />' + log.innerHTML;
            updateBatteryInfo(event.target);
         }

         function addBatteryEvents(battery) {
            var events = [
               'chargingchange',
               'chargingtimechange',
               'dischargingtimechange',
               'levelchange'
            ];

            for (var i = 0; i < events.length; i++) {
               battery.addEventListener(events[i], eventHandler);
            }
         }

         function enableClearLogButton() {
            document.getElementById('clear-log').addEventListener('click', function() {
               document.getElementById('log').innerHTML = '';
            });
         }

         window.navigator = window.navigator || {};

         var isOldApiSupported = 'battery' in window.navigator;
         var isNewApiSupported = 'getBattery' in window.navigator;

         if (!isOldApiSupported && !isNewApiSupported) {
            document.querySelector('.js-api-support').removeAttribute('hidden');
            document.querySelector('.js-api-info').setAttribute('hidden', '');
         } else if (isOldApiSupported) {
            updateBatteryInfo(navigator.battery);
            addBatteryEvents(navigator.battery);
            enableClearLogButton();
         } else {
            navigator
               .getBattery()
               .then(function(battery) {
                  updateBatteryInfo(battery);
                  addBatteryEvents(battery);
               });
            enableClearLogButton();
         }
   
