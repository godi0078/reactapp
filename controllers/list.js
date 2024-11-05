import List from "../models/List.js";
import City from "../models/City.js";

export const createList = async (req, res) => {
  try {
    const { name, acronym, color } = req.body;
    const user = await User.findById(req.userId);

    const newList = new List({
      name,
      acronym,
      color,
    });

    await newList.save();

    res.json({
      message: "Список создан",
      newList,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addCityToList = async (req, res) => {
  try {
    const { listId, cityId } = req.body;

    if (cityId) {
      try {
        await List.findByIdAndUpdate(listId, {
          $push: { cities: cityId },
        });
      } catch (error) {
        console.log(error);
      }

      const lists = await List.find().sort("-createdAt");

      res.json({
        message: "Город добавлен к списку",
        lists,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeList = async (req, res) => {
  try {
    const list = await List.findByIdAndDelete(req.params.id);

    if (!list) return res.json({ message: "Список не найден" });

    res.json({
      message: "Список удален",
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeCityFromList = async (req, res) => {
  try {
    const { id, cityId } = req.params;
    const list = await List.findByIdAndUpdate(id, {
      $pull: { cities: cityId },
    });

    console.log(list);

    if (!list) return res.json({ message: "Список не найден" });

    res.json({
      message: "Город удален из списка",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getLists = async (req, res) => {
  try {
    const lists = await List.find().sort("-createdAt");
    res.json({
      lists,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getListById = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    res.json({
      list,
    });
  } catch (error) {
    console.log(error);
  }
};
