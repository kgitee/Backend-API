const cart = require('../models/cart');
const product = require('../models/product');

module.exports.get_cart_products = async (req,res) => {
    const userId = req.params.id;
    try{
        let cart = await Cart.findOne({userId});
        if(cart && cart.products.length>0){
            res.send(cart);
        }
        else{
            res.send(null);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

module.exports.add_cart_product = async (req,res) => {
    const userId = req.params.id;
    const { productId, quantity } = req.body;

    try{
        let cart = await Cart.findOne({userId});
        let product = await product.findOne({_id: productId});
        if(!product){
            res.status(404).send('product not found!')
        }
        const price = product.price;
        const name = product.title;
        
        if(cart){
            // if cart exists for the user
            let productIndex = cart.products.findIndex(p => p.productId == productId);

            // Check if product exists or not
            if(productIndex > -1)
            {
                let itemProduct = cart.products[productIndex];
                itemProduct.quantity += quantity;
                cart.products[productIndex] = itemProduct;
            }
            else {
                cart.products.push({ productId, name, quantity, price });
            }
            cart.totalAmount += quantity*price;
            cart = await cart.save();
            return res.status(201).send(cart);
        }
        else{
            // no cart exists, create one
            const newCart = await Cart.create({
                userId,
                products: [{ productId, name, quantity, price }],
                totalAmount: quantity*price
            });
            return res.status(201).send(newCart);
        }       
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

module.exports.update_cart_product = async (req, res) => {
    const userId = req.params.id;
    const { productId, qty } = req.body;

    try{
        let cart = await Cart.findOne({userId});
        let product = await product.findOne({_id: productId});

        if(!product)
            return res.status(404).send('product not found!'); // not returning will continue further execution of code.
        
        if(!cart)
          return res.status(400).send("Cart not found");
        else{
            // if cart exists for the user
            let productIndex = cart.products.findIndex(p => p.productId == productId);

            // Check if product exists or not
            if(productIndex == -1)
              return res.status(404).send('product not found in cart!');
            else {
                let itemProduct = cart.products[productIndex];
                itemProduct.quantity = qty;
                cart.products[productIndex] = itemProduct;
            }
            cart.totalAmount = cart.products.reduce((sum, product) => sum + product.price * product.quantity,0);
            cart = await cart.save();
            return res.status(201).send(cart);
        }     
    }
    catch (err) {
        // just printing the error wont help us find where is the error. Add some understandable string to it.
        console.log("Error in update cart", err);
        res.status(500).send("Something went wrong");
    }
}

module.exports.delete_product = async (req,res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    try{
        let cart = await Cart.findOne({userId});
        let productIndex = cart.products.findIndex(p => p.productId == productId);
        if(productIndex > -1)
        {
            let itemProduct = cart.products[productIndex];
            cart.totalAmount -= itemProduct.quantity*itemProduct.price;
            cart.products.splice(productIndex,1);
        }
        cart = await cart.save();
        return res.status(201).send(cart);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}
