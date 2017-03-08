To run Q&A Engine:

1.- Go to the public directory

  cd /var/www/public/

2.- Run the first time script. It will last some minutes:

  bash first_run.sh

3.- Launh Citizenpedia using grunt:

  grunt serve

4.- For Google Oauth, copy file

  server/config/local.env.sample.js

  to

  server/config/local.env.js

  And add GOOGLE_ID and GOOGLE_SECRET


5.- You can access Q&A Engine in the ip of your machine in port 8080, like

  http://192.168.33.10:8080
