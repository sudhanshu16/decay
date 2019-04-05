import {Injectable} from '@angular/core';
import {Cache} from './utils/storage.provider';

let OneSignal;

const url = '';

@Injectable()
export class OneSignalService {
  @Cache({pool: 'OneSignal'}) oneSignalInit; // to check if OneSignal is already initialized.
  @Cache({pool: 'OneSignal'}) oneSignalId: any; // store OneSignalId in localStorage
  @Cache({pool: 'user'}) userID: any; // User Session management token

  constructor() {
    console.log('OneSignal Service Init', this.oneSignalInit);
  }

  static addScript(fileSrc, callback) {
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = callback;
    script.src = fileSrc;
    head.appendChild(script);
  }

  // Call this method to start the onesignal process.
  public init() {
    this.oneSignalInit ? console.log('Already Initialized') : OneSignalService.addScript('https://cdn.onesignal.com/sdks/OneSignalSDK.js',
      (callback) => {
        console.log('OneSignal Script Loaded');
        this.initOneSignal();
      });
  }

  initOneSignal() {
    OneSignal = window['OneSignal'] || [];
    OneSignal.sendTag('user_id', this.userID, (tagsSent) => {
      // Callback called when tags have finished sending
      console.log('OneSignal Tag Sent', tagsSent);
    });
    console.log('Init OneSignal');
    OneSignal.push(['init', {
      appId: '**********************',
      autoRegister: true,
      allowLocalhostAsSecureOrigin: true,
      notifyButton: {
        enable: false,
      },
    }]);
    console.log('OneSignal Initialized');
    this.checkIfSubscribed();
  }

  subscribe() {
    window['OneSignal'].push(() => {
      console.log('Register For Push');
      OneSignal.push(['registerForPushNotifications']);
      OneSignal.on('subscriptionChange', (isSubscribed) => {
        console.log('The user\'s subscription state is now:', isSubscribed);
        OneSignal.sendTag('user_id', this.userID, (tagsSent) => {
          // Callback called when tags have finished sending
          console.log('OneSignal Tag Sent', tagsSent);
        });
        this.listenForNotification();
        OneSignal.getUserId().then((userId) => {
          console.log('User ID is', userId);
          this.oneSignalId = userId;
          this.updateLocalUserProfile();
        });
      });
    });
  }

  listenForNotification() {
    console.log('Initalize Listener');
    OneSignal.on('notificationDisplay', (event) => {
      console.log('OneSignal notification displayed:', event);
      this.listenForNotification();
    });
  }

  getUserID() {
    OneSignal.getUserId().then((userId) => {
      console.log('User ID is', userId);
      this.oneSignalId = userId;
    });
  }

  checkIfSubscribed() {
    OneSignal.push(() => {
      /* These examples are all valid */
      OneSignal.isPushNotificationsEnabled((isEnabled) => {
        if (isEnabled) {
          console.log('Push notifications are enabled!');
          this.getUserID();
        } else {
          console.log('Push notifications are not enabled yet.');
          this.subscribe();
        }
      }, (error) => {
        console.log('Push permission not granted');
      });
    });
  }

  updateLocalUserProfile() {
    // Store OneSignal ID in your server for sending push notificatios.
  }
}
