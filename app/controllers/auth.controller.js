const jwt = require("jsonwebtoken");
const { Schema, default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const secretKey = process.env.SECRETKEY;

const schemaUser = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model("users", schemaUser);

const findUserByUsername = async (username, password) => {
  try {
    const user = await userModel.findOne({ username: username });
    if (!user) {
      return false;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return false;
    }

    return user;
  } catch (error) {
    return false;
  }
};

const loginUser = async (req, res) => {
  const { user, password } = req.body;

  const inputsEmpty = Object.entries(req.body)
    .filter((input) => input[1] === "")
    .map((input) => input[0]);

  if (inputsEmpty.length > 0) {
    return res.json({
      success: false,
      error: "Todos los campos son obligatorios. Inputs vacíos: " + inputsEmpty,
    });
  }

  const userObject = await findUserByUsername(user, password);

  if (!userObject) {
    return res.status(401).json({
      success: false,
      error: "Nombre de usuario o contraseña incorrectos",
    });
  }

  jwt.sign(
    { name: userObject.username, password: userObject.password },
    secretKey,
    { expiresIn: "600h" },
    (err, token) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, error: "Error al generar el token" });
      }
      res.status(200).json({ success: true, token: token });
    }
  );
};

module.exports = { loginUser };
