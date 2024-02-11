const mongoose = require("mongoose")
const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    }, 
    phone: {
        type: String
    },
     designation: {
        type: String
    },
     salary: {
        type: Number
    },
     city: {
        type: String
    }, 
    state: {
        type: String
    
    }
})
const Emoployee = new mongoose.model("Employee",EmployeeSchema)

module.exports = Emoployee