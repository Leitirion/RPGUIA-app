
### Frontend project with react and surge (or with firebase).
[![CircleCI](https://circleci.com/gh/Leitirion/My-circleci-cypress-ui-automation.svg?style=svg)](https://circleci.com/gh/Leitirion/My-circleci-cypress-ui-automation)

### Table of Contents

- Maintainers:

  [github.com/mikementor](https://github.com/mikementor)

  	
		
  [github.com/leitirion](https://github.com/leitirion)
- How to set up firebase	 
- How to run and publish
- How to install

## How to set up firebase
1. Login to the Firebase Console and add a ```new project```. 
2. Follow the steps until you arrive at your project home screen. 
3. Click the ```authentication tab``` from the menu and choose the ```Set up sign in``` method.
4. Use Email/Password authentication method. 
5. Click ```edit``` and toggle on the first switch.
6. After enabling authentication, click the Database menu link and use ```Create Database``` in the cloud Firestore section.
7. Select ```Start``` in test mode.
8. Next, choose the location for your database host that best applies to your project. One of the multi-region choices is usually perfect.

## How to run and publish
1. For test project and see work it or not, type ```npm run start``` (this show your project on your localhost for tests and changes).
2. For manually build project to test machine on surge.sh or on your domen use ```npm run build```.
3. After test succeed, use command ```firebase deploy``` to build to firebase or your command to build to your domen (this show your project on your domen page).

## How to install
1. Run the following command to install firebase-tools:
```npm install -g firebase-tools```
2. When thats finished, run the following command to login to firebase:
```firebase login```
3. After you’ve successfully logged in run this command to initialize firebase in your react-app (make sure you’re in your project directory):
```firebase init```
4. For React-Redux:
```npm install react-redux```
5. Let’s also install Redux Thunk. It is a very useful middleware that allows you easily create async actions:
```npm install redux-thunk```
6. For client side routing let’s install React Router. It will allow us to setup our login page and protected sign-in area:
```npm install react-router-dom```
7. And finally, lets install firebase which allows to interact with firebase within react app:
```npm install firebase```
8. For install Material-UI use:
```npm install @material-ui/core``` or install your own framework.
9. Then install the material icon library:
```npm install @material-ui/icons``` or install your own icon library.
