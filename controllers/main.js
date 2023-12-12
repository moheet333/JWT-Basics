const { BadRequest } = require("../errors/index");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    // could be done with mongoose or Joi package
    const error = new BadRequest("Please provide both username and password");
    throw error;
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const { id, username } = req.user;

  const luckyNumber = parseInt(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${username} #${id}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
