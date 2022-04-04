### "Install dependencies"

npm install

### "Create MySql Database"

database name : todo
username: root
password :""

### "Keep database server up and running"

### "For database Migration user following command"

npx sequelize-cli db:migrate

### "For use default app user settings use following command. It will create the super admin account"

npx sequelize-cli db:seed:all

### "start the server using following command"

npm start

### "Todo app server side application will run on port 5000. you can change it adding prot number on env File"

### "sample env settings"################################################################

NODE_ENV =development
PORT=5000
DB_NAME=todo
DB_USERNAME=root
DB_PASSWORD=""
DB_DRIVER=mysql
DB_HOST=localhost
JWT_SECRET=hello
