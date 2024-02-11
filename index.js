const express = require("express")
var app = express()
var hbs = require("hbs")
var path = require("path")
const bodyParser = require("body-parser")
require("./views/db_connect")
const Employee = require("./views/models/Employee")



app.use(express.static("views/public"))
app.set("view engine", "hbs")
const encoder = bodyParser.urlencoded()

hbs.registerPartials(path.join(__dirname, "views/partial"))

app.get("/", async (req, res) => {
   try {
      var data = await Employee.find().sort({ "id": -1 })

      res.render('index', { data })
   }
   catch (error) {
      console.log(error);
   }
})
app.get("/add", (req, res) => {
   res.render('add')
})
app.post("/add", encoder, async (req, res) => {
   try {
      const data = new Employee(req.body)
      await data.save()
      res.redirect("/")
   }
   catch (error) {
      console.log(error);
      res.redirect("/")
   }
})
app.get("/delete/:_id", async (req, res) => {
   try {
      await Employee.deleteOne({ _id: req.params._id })
      res.redirect("/")
   }
   catch (error) {
      console.log(error)
      res.redirect("/")
   }
})
app.get("/update/:_id", async (req, res) => {
   try {
      var data = await Employee.findOne({ _id: req.params._id })
      if (data)
         res.render("update", { data })
      else
         res.redirect("/")
   }
   catch (error) {
      console.log(error)
      res.redirect("/")
   }
})
app.post("/update/:_id", encoder, async (req, res) => {
   try {
      var data = await Employee.findOne({ _id: req.params._id })
      if (data) {
         console.log(data.name);
         data.name = req.body.name
         console.log(data.name);
         data.email = req.body.email
         data.phone = req.body.phone
         data.designation = req.body.designation
         data.salary = req.body.salary
         data.city = req.body.city
         data.state = req.body.state
         await data.save()
      }
      res.redirect("/")
   }
   catch (error) {
      console.log(error)
      res.redirect("/")
   }
})
app.post("/search", encoder, async (req, res) => {
   try {
      var data = await Employee.find({
         $or: [
            { name: { $regex: req.body.search, $options: "i" } },
            { email: { $regex: req.body.search, $options: "i" } },
            { phone: { $regex: req.body.search, $options: "i" } },
            { state: { $regex: req.body.search, $options: "i" } },
            { city: { $regex: req.body.search, $options: "i" } }
         ]
      })
      res.render('index', { data })
   }
   catch (error) {
      console.log(error);
      res.redirect("/")
   }
})
app.listen(9000, () => console.log("server Running at http://localhost:9000"))