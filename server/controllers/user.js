const User = require("../models/user");
const crypto = require("crypto");

//Register a new user

exports.registerUser = catchAsyncErrors(async (req, res, next) => {

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password
    
  });

  sendToken(user, 201, res);
});