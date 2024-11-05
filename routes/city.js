import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createCity, getCities, removeCity, getCityById, getCitiesForList } from "../controllers/cities.js";

const router = new Router();

router.post("/add", checkAuth, createCity);

router.get("/list", checkAuth, getCities);

router.get("/list/:id", checkAuth, getCitiesForList);

router.get("/:id", checkAuth, getCityById);

router.delete("/:id", checkAuth, removeCity);

export default router;
