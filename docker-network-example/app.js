const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios").default;
const mongoose = require("mongoose");

const Favorite = require("./models/favorite");

const app = express();

app.use(bodyParser.json());

app.get("/favorites", async (req, res) => {
  const favorites = await Favorite.find();
  res.status(200).json({
    favorites: favorites,
  });
});

app.post("/favorites", async (req, res) => {
  const favName = req.body.name;
  const favType = req.body.type;
  const favUrl = req.body.url;

  try {
    if (favType !== "movie" && favType !== "character") {
      throw new Error('"type" should be "movie" or "character"!');
    }
    const existingFav = await Favorite.findOne({ name: favName });
    if (existingFav) {
      throw new Error("Favorite exists already!");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  const favorite = new Favorite({
    name: favName,
    type: favType,
    url: favUrl,
  });

  try {
    await favorite.save();
    res
      .status(201)
      .json({ message: "Favorite saved!", favorite: favorite.toObject() });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

app.get("/movies", async (req, res) => {
  try {
    const response = await axios.get("https://swapi.dev/api/films");
    res.status(200).json({ movies: response.data });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

app.get("/people", async (req, res) => {
  try {
    const response = await axios.get("https://swapi.dev/api/people");
    res.status(200).json({ people: response.data });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

mongoose.connect(
  // "mongodb://localhost:27017/swfavorites", // container의  app은 host machine과 이 도메인으로 통신 불가능
  // "mongodb://host.docker.internal:27017/swfavorites", // container의 app이 host machine과 통신하려면 특수 도메인 사용
  // "mongodb://172.17.0.2:27017/swfavorites", // 연결 대상 container의 IP 주소를 직접 명시하는 경우
  "mongodb://mongodb:27017/swfavorites", // 같은 container network에 있는 경우 container 이름을 도메인으로 사용
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(3000);
    }
  }
);
