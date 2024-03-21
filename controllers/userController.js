const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_secret = "##%dasdasd##";

const userController = {
  // Obtener todos los usuarios
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // Crear un nuevo usuario
  createUser: async (req, res) => {
    const userData = req.body;
    try {
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      console.error("Error al crear usuario:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // Actualizar

  updateUser: async (req, res) => {
    try {
      const { nombre } = req.params;

      const userUpdate = await User.findOneAndUpdate(
        { nombre: nombre },
        { $set: { nombre: "Pedro" } }
      );
      res.json(userUpdate);
    } catch (error) {
      console.error("Error al crear usuario:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // Eliminar
  deleteUser: async (req, res) => {
    try {
      const { nombre} = req.params;
      const userDelete = await User.findOneAndDelete({ nombre: nombre });
      res.json(userDelete);
    } catch (error) {
      console.error("Error al crear usuario:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  register: async (req, res) => {
    try {
      const users = await User.find();
      const { nombre, correo, contraseña } = req.body;

      const userData = {
        userId: users.length + 1,
        nombre: nombre,
        correo: correo,
        contraseña: await bcrypt.hash(contraseña, 10),
      };

      const newUser = new User(userData);
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  login: async (req, res) => {
    try {
      const { correo, contraseña } = req.body;
      const user = await User.find({ correo: correo });

      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      const isPasswordValid = await bcrypt.compare(
        contraseña,
        user[0].contraseña
      );
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
      const token = jwt.sign({ userId: user.id }, jwt_secret, {
        expiresIn: "1h",
      });

      res.json({ message: "Logged in successfully", token });
    } catch (error) {
      console.error("Error al loguear usuario:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = userController;
