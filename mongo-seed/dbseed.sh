#! /bin/bash

mongoimport --host mongodb --db paizaqa-dev --collection categories --type json --jsonArray --file /mongo-seed/categories.json
mongoimport --host mongodb --db paizaqa-dev --collection users --type json --jsonArray --file /mongo-seed/users.json