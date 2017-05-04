# InstaJam
Social music sharing single-page web application built using the MEAN stack. A clone of soundcloud.com created from start to finish in a 5 day sprint.

## Authors
  * [Mick Johnson](https://github.com/mickajohnson)
  * [Michael Mitchell](https://github.com/mikeybags)
  * [Curtis Wulfsohn](https://github.com/cwulfsohn)

## Technologies
  * MEAN Stack 
    * MongoDB
    * Express.js
    * AngularJS
    * Node.js
  * Mongoose
  * AngularUI
  * JavaScript
  * JQuery
  
## Demo
* [AWS Deployed Demo Site](http://52.14.233.204)

## Dependencies
NPM Dependencies
  ```
    "bcrypt": "^1.0.2",
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.16.1",
    "connect-multiparty": "^2.0.0",
    "express": "^4.14.1",
    "mongoose": "^4.8.5",
    "mongoose-text-search": "0.0.2",
    "ng-file-upload": "^12.2.13"
  ```
Bower Dependencies 
 ```
    "angular": "^1.6.2",
    "angular-route": "^1.6.2",
    "angular-cookies": "^1.6.2",
    "ng-file-upload": "^12.2.13",
    "angular-sanitize": "^1.6.2",
    "wavesurfer.js": "^1.3.4",
    "angular-bootstrap": "^2.5.0"
 ```
## To Run Project Locally
  * Clone the project
  ```
    git clone https://github.com/mikeybags/InstaJam.git 
  ```
  * Install (if necessary) and Run MongoDB
  ```
    brew install Mongodb
    sudo mongod 
  ```
  * Install NPM dependencies
  ```
    npm install
  ```
  * Install Bower dependencies
  ```
    bower install
  ```
  * Run Server
  ```
    node server.js
  ```
  * Open localhost:2401 on your browser to view the app
