import City from "../models/City.js";
import List from "../models/List.js";
import User from "../models/User.js";

export const createCity = async (req, res) => {
  try {
    const { name, foundation } = req.body;
    const user = await User.findById(req.userId);

    const newCity = new City({
      name,
      foundation,
    });

    await newCity.save();

    res.json({
      message: "Город добавлен",
      newCity,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeCity = async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);

    if (!city) return res.json({ message: "Город не найден" });

    res.json({
      message: "Город удален",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCities = async (req, res) => {
  try {
    const cities = await City.find().sort("-createdAt");
    res.json({
      cities,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCitiesForList = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    const cities = await City.find().sort("-createdAt");

    let newObj = Object.fromEntries(
      Object.entries(cities).map(([_, v]) => [v._id, v])
    );

    list.cities.forEach((e, i) => {
      delete newObj[e];
    });

    res.json({
      newObj,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCityById = async (req, res) => {
  try {
    const cityId = req.params.id;

    const city = await City.findById(cityId);

    if (city) {
      res.json({
        city,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
