const mongoose = require("mongoose")
// mongoose.connect("mongodb://127.0.0.1:27017")
// .then(()=>{
//     console.log("dataBase is connected");
// })
// .catch(error=>{
//     console.log(error);
// })
function getConnect() {
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/Ajay-data")
        console.log("database is connencted");

    }
    catch (error) {
        console.log(error);
    }
}

getConnect();