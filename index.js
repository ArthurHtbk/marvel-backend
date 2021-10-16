require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const cloudinary = require("cloudinary").v2;

const User = require("./models/User");
const isAuthenticated = require("./middlewares/isAuthenticated");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const app = express();
app.use(formidable());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome!" });
});

app.post("/user/signup", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.fields.email });
    if (!user) {
      const salt = uid2(16);
      const hash = SHA256(req.fields.password + salt).toString(encBase64);
      const token = uid2(16);

      const newUser = new User({
        email: req.fields.email,
        username: req.fields.username,
        token: token,
        hash: hash,
        salt: salt,
      });

      const result = await cloudinary.uploader.upload(req.files.picture.path, {
        folder: `/marvel/user/${newUser._id}`,
      });

      newUser.picture = result;
      await newUser.save();
      res.status(200).json(newUser);
    } else {
      res
        .status(409)
        .json("An account has already been created for this email address");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/user/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.fields.email });

    if (user) {
      const newHash = SHA256(req.fields.password + user.salt).toString(
        encBase64
      );

      console.log(newHash);

      if (newHash === user.hash) {
        res.status(200).json(user);
      } else {
        res.status(401).json("Incorrect email address and / or password");
      }
    } else {
      res.status(401).json("Incorrect email address and / or password");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    // console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&skip=${req.query.skip}&title=${req.query.title}`
    );
    // console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&skip=${req.query.skip}&name=${req.query.name}`
    );
    // console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post(
  "/favorites/characters/add_delete",
  isAuthenticated,
  async (req, res) => {
    try {
      const user = req.user;
      let favorite = false;
      for (let i = 0; i < user.favorites.characters.length; i++) {
        if (user.favorites.characters[i] === req.fields.id) {
          favorite = true;
          user.favorites.characters.splice(i, 1);
          await user.save();
          break;
        } else {
          continue;
        }
      }
      if (!favorite) {
        user.favorites.characters.push(req.fields.id);
        await user.save();
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

app.post("/favorites/comics/add_delete", isAuthenticated, async (req, res) => {
  try {
    const user = req.user;
    let favorite = 0;
    for (let i = 0; i < user.favorites.comics.length; i++) {
      if (user.favorites.comics[i] === req.fields.id) {
        favorite++;
        user.favorites.comics.splice(i, 1);
        await user.save();
        break;
      } else {
        continue;
      }
    }
    if (!favorite) {
      user.favorites.comics.push(req.fields.id);
      await user.save();
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started!");
});
