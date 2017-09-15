importScripts('https://www.gstatic.com/firebasejs/3.7.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.7.2/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyDvdO9PkZe5RQGU7_gY_w3ApNzeUZI9nTI",
    authDomain: "sport-test-push.firebaseapp.com",
    databaseURL: "https://sport-test-push.firebaseio.com",
    projectId: "sport-test-push",
    storageBucket: "sport-test-push.appspot.com",
    messagingSenderId: "461249772176"
  };
  firebase.initializeApp(config);

firebase.messaging();

self.addEventListener('notificationclick', function(event) {
    const target = event.notification.data.click_action || '/';
    event.notification.close();

    // This looks to see if the current is already open and focuses if it is
    event.waitUntil(clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    }).then(function(clientList) {
        // clientList always is empty?!
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == target && 'focus' in client) {
                return client.focus();
            }
        }
    
        return clients.openWindow(target);
    }));
});
