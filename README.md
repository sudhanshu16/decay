[Use Decay App now by clicking here.](https://30days15products.xyz)

# Introduction

An app (PWA) that notifies you before your groceries go bad.

It consists a user facing app written in Angular with a PHP backend to send 
notifications to users as required.

# Technologies Used

1. **Angular**: FrontEnd Progressive Web Applications
2. **PHP**: Native PHP script for push notifications
3. **Firebase/Firestore**: Realtime Database Solution
4. **OneSignal**: Push Notifications over the Web

# Setup Steps

1. Substitute credentials in the following files:
   - `src/app/app.module.ts`: Create an app on Firebase then copy the credentials provided for the app by firebase into the `config` variable.  
   - `src/backend/firebase_service_credentials`: Go to Project Settings on Firebase console then click on service accounts from the top navigation and download/generate private. Paste downloaded key into this file.  
   - `src/app/one-signal.service.ts`: Create a OneSignal app and substitute your appId in the `initOneSignal()` function.  
   - `src/manifest.json`: Substitute the `gcm_sender_id` with the one provided in the OneSignalSDK zip file
   - `src/backend/reminder.php`: Substitute the secret with any hash of your choice.
2. Install packages
   - Run `npm install` in the `/` directory
   - Run `composer install` in the `/src/backend` directory
3. Database Setup. 
   - You may use the following firestore rules  
        ```
        service cloud.firestore {
         match /databases/{database}/documents {
            match /users/{userId} {
              allow read, update: if request.auth.uid == userId;
              allow create: if request.auth.uid != null;
            }
            match /users/{userId}/articles/{document=**} {
              allow read, update, delete: if request.auth.uid == userId;
              allow create: if request.auth.uid != null;
            }
            match /users/{document=**} {
              allow read, write: if request.auth.token.admin == true ;
            }
          }
        }
        ```
   - Create a collection named `users` to start with.
4. Under authentication, turn Sign-In by Google on. Whitelist your desired domain.
5. Setup and customize the OneSignal app according to your needs.

# TODOs

- Writing Tests
- Add intuitive prompt for user to add app on home screen.
- Intelligent expiry recommendation. For ex: if you buy milk, give an approximate expiry of 5 days.
 
If anyone is interested in contributing, feel free to create pull request for the same.