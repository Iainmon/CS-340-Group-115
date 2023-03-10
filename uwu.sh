git reset --hard origin/iain
git pull origin iain
cd site/backend;
yarn;
cd ..;
cd ..;
pm2 reload pharmapp;
pm2 restart pharmapp;
echo "xX_DONE BBG_Xx"
