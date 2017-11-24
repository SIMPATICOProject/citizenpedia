# Citizenpedia

The Citizenpedia is human computation framework that complements the simplification features of the H2020 Simpatico Project.
The framework is composed of two tools, the Question & Answers Engine (QAE) and the Collaborative Procedure Designer (CPD).

## Questions & Answers Engine
This section describes the installation process for the QAE. The guide assumes that a Linux/Unix system is being used. The process has been tested in a Ubuntu Server platform.

### Requirements

- Apache2, or any web server able to redirect traffic.
- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [MongoDB](https://www.mongodb.org/) - ^3.4

- [Bower](bower.io) (`npm install --global bower`)
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)

NOTE: You shouldn't install manually sass gem, Bower and Grunt. They will be automatically installed with a provided script.

### Installation and running instructions

1.- First, clone the repository in the desired location:

  git clone https://github.com/SIMPATICOProject/citizenpedia.git citizenpedia

2.- In the target directory, run the first_run.sh script. It will install all the required dependencies needed (It can take several minutes to complete).

  bash first_run.sh

3.- In the same directory, run the following command to run Citizenpedia:

  grunt serve

  The home screen of Citizenpedia should be accessible in https://localhost:9000/qae

### Configuration

The instructions of the previous section guide to deploy the Citizenpedia with the defaul configuration. However, some files can be edited in order to configure the app. Under directory:

  /server/config/environment

the following files can be found: 

  - development.js and production.js, in order to configure the development and production environment respectively
  - shared.js, to configure the variables that affect both development and production environments
  - index.js, that contains the variables for the default configuration of Citizenpedia 
  
In the development.js file, we find some important constants:

  - port: 9000 - port where the app will be served.
  - seedDB: false - This option, if set to true, will initialize the database with test data.

In the shared.js, we find another important config:

  - path: '/qae' - This is the path where the app will be served (like http://localhost:9000/qae)
  - cpd_path: '/cpd' - This is the path where the questions relating a CPD diagram will return

In order to change this path, just edit this file and also /client/index.html to change this line:

  <base href="/qae/">

Also, for changing the serving path, Apache2 has to be configured with a VortualHost and a reverse proxy. E.g:

```
  ProxyRequests Off
  ProxyPreserveHost On

  <Location /qae>
          ProxyPass http://localhost:9000
  </Location>
```

Note: Be careful not to add an ending '/' to the ProxyPass path.

### Home page configuration

Via configuration file, is easy to add and remove components from the home page.

![Home components](https://preview.ibb.co/gJuAnm/home_config.png)

Setting the following variables to true or false will show or hide the above components:

```
home_searchbar
home_ask_button
home_categories
```

If a categories block is defined, an array of categories should be defined in the configuration file. For example:

```
home_categories_list: [
    {title :'Benestar', link :'questions/list/BS607A', image :'assets/images/svg/tag.png' },
    {title :'School', link :'categories/list/5913170c65c17ab8c2406a96', image :'assets/images/svg/5913170c65c17ab8c2406a96.png' },
    {title :'Community', link :'categories/list/5913170c65c17ab8c2406a97', image :'assets/images/svg/5913170c65c17ab8c2406a97.png' },
    {title :'Social Service', link :'categories/list/5913170c65c17ab8c2406a98', image :'assets/images/svg/5913170c65c17ab8c2406a98.png' },
  ]
```

Links and images paths can be relatives or absolutes.


### i18n

The Citizenpedia is i18n-enabled, i.e., none of the displayed labes are hardcoded and the language of the deployment can be easily changed. To that end, two steps must be followed:

  - Add in the client/languages folder a json file that contains the translation to the desired language. File "en.json" (for English) can be used as an example.
  - Adding the "language: 'XX'" variable to any of the configuration files described above (e.g. shared.js in order to configure both development and production environments) 

Make sure that the name of the json file within client/languages folder and the name of the variable match for the new language to work, e.g., in order to add Spanish language, create "es.json" under client/languages and add "language: 'es'" in the configuration file. 

If a secondary language is needed, a secondlanguage value can be set in the configuration file, so a language selector will appear in the upper right corner of the navigation bar.

### AAC Integration

The file

/config/local.env.sample.js

Has to be renamed to local.env.js in order to have some extra config constants that will be used in the app. There, the following constants must be declared for the integration with AAC:

AAC_ID
AAC_SECRET
AAC_ROOT_URL
AAC_TOKEN_URL
AAC_URL
AAC_CALLBACK_URL
AAC_PROXY (Just in case you need a proxy)

#### Optional

For automation purposes, the file node-app_example can be used to configure the app as a Linux service, e.g. use "service qae start" to start the Citizenpedia.
