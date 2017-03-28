# Questions & Answers Engine

This is the code for the QAE of the Simpatico Project.

## Requirements

- Apache2, or any web server able to redirect traffic.
- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [MongoDB](https://www.mongodb.org/) - ^3.4
- [Bower](bower.io) (`npm install --global bower`)
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)


(The sass gem, Bower and Grunt will be automatically installed)

## Pre-installing configuration

Some files can be edited in order to properly configure the app. They can be found in the directory

  /server/config/environment

There are four files. Two for each environment (development.js and production.js), one for shared config (shared.js) and one index.js with some standard config.

In the development.js file, we find some important constants:

  - port: 9000 - This is the port where the app will be served.
  - seedDB: false - This option, if set to true, will initialize the database with test data.

In the shared.js, we find another important config:

  - path: '/qae' - This is the path where the app will be served (like http://localhost:9000/qae)

In order to change this path, just edit this file and also /client/index.html to change this line:

  <base href="/qae/">

Also, for changing the serving path, Apache2 has to be configured with a VortualHost and a reverse proxy. E.g:

  ProxyRequests Off
  ProxyPreserveHost On

  <Location /qae>
          ProxyPass http://localhost:9000
  </Location>

### Optional

The file

/config/local.env.sample.js

Can be renamed to local.env.js in order to have some extra config constants that will be used in the app.

## Installing instructions

1.- First, clone the repository in the location where you want to have it installed.

  git clone https://github.com/SIMPATICOProject/citizenpedia.git citizenpedia

2.- In the location where it is cloned, run the first_run.sh script. It will install all the dependencies needed.

  bash first_run.sh

  (It can take several minutes to complete)

3.-
