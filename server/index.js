//set up dependencies

const express = require('express');
const mongoose = require('mongoose');
// import routes
const productRoutes = require('./routes/product'); 
const orderRoutes = require('./routes/order'); 
const userRoutes = require('./routes/user'); 

//add the database connection
mongoose.connect("mongodb+srv://admin:admin@testdatabase1.zq0wb.mongodb.net/mcdowell_sports_house?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

//database connection confirmation message
mongoose.connection.once('open', () => console.log("Now connected to MongoDB Atlas"))

//server setup
const app = express()

//middleware that allows our app to receive nested JSON data
app.use(express.json())	
app.use(express.urlencoded({
	extended: true
}))

//Route Imports
app.use('/product', productRoutes)
app.use('/order', orderRoutes)
app.use('/users', userRoutes)

const port = 4000

app.listen(process.env.PORT || port, () => {
	console.log(`Server running on port ${port}`)
})