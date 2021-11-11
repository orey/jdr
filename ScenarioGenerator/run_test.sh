#!/bin/sh
echo "dice.js"
node -e 'require("./dice.js").test()'
echo "generator01.js"
node -e 'require("./generator01.js").test()'

