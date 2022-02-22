const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

// import routes
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

//add the database connection
mongoose.connect("mongodb+srv://admin:admin@testdatabase1.zq0wb.mongodb.net/mcdowell_sports_house?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

//database connection confirmation message
mongoose.connection.once('open', () => console.log("Now connected to MongoDB Atlas"))

//server setup
const app = express();

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}))
//add imported routes
app.use('/users',userRoutes);
app.use('/products',productRoutes);
app.use('/carts',cartRoutes);
app.use('/orders',orderRoutes);

/*if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}*/

//const dbURI = config.get('dbURI');
const port = 4000;

app.listen(process.env.PORT || port, () => {
	console.log(`Server running on port ${port}`)
})
