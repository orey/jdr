#!/bin/sh
clear

if [ $# != 1 ]
then
    echo "Git publish script version 1"
    echo "Usage : publish.sh [comment_between_quotes]"
    exit 0
fi

git add *
git commit -a -m "$1"
git push origin master

echo "Done"




