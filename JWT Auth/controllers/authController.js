const UserModel = require("../models/userModels");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const signup = async (req, res) => {
    const { name, email, password, isAdmin = false } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 5);
        const newUser = await UserModel.create({ name, email, password : hashedPassword, isAdmin });
        res.send({status : 'success', user : newUser });
    } catch (err) {
      console.log(err)
        res.status(500).send({status : 'Error', err : err});
    }
}
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if(!user) {
        res.status(401).send({status : 'Error', msg : 'Invalid User'});
    } else {
      const match = await bcrypt.compare(password, user.password);
      if(!match) {
        res.status(401).send({status : 'Error', msg : 'Invalid password' });

      }
        // generate a token;
        const userPayload = { name : user.name, email : user.email, isAdmin : user.isAdmin }
        const token = jwt.sign(userPayload, process.env.JWT_SECRET_KEY, { algorithm : "HS384", expiresIn : '1d' });
        console.log(token);
        //body token
        //cookies
        res.cookie('jwt', token);
        res.send({status : 'success', user, token });
    }
  } catch (err) {
    res.status(500).send({status : 'Error', err : err})
  }
}
const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge : 1});
  res.send({status : 'success', msg : 'logged out successfully'});
}

module.exports = {
    signup,
    login,
    logout
}
