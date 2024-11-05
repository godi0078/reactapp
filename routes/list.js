import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createList, getLists, removeList, getListById, addCityToList, removeCityFromList } from "../controllers/list.js";

const router = new Router();

router.post("/add", checkAuth, createList);

router.post("/addCity", checkAuth, addCityToList);

router.get("/list", checkAuth, getLists);

router.get("/:id", checkAuth, getListById);

router.delete("/:id", checkAuth, removeList);

router.delete("/removeCity/:id/:cityId", checkAuth, removeCityFromList);

export default router;
