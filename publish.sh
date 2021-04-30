#!/bin/bash
clear

if [ $# == 0 ]
then
    echo "Git publish script version 1"
    echo "Usage : publish.sh [comment_between_quotes]"
    exit 0
fi

git add *
echo "$@"
git commit -a -m "$@"
git push origin master

echo "Done"




