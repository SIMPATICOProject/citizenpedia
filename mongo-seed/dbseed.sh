#! /bin/bash

mongoimport --host mongodb --db paizaqa-dev --collection categories --type json --jsonArray --file /mongo-seed/categories.json