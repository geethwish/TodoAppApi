const sequelize = require('./db');;

const dbTest = async () => {

    sequelize.authenticate()
        .then(() => {

            console.log(`SQL Database Connected`.green.underline);


        })
        .catch((err) => { console.log("Error: " + err); })

}

module.exports = dbTest