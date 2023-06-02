import { Router } from "express";
import { createInventory, getAllInventory, updateInventory } from "../controllers/inventory.js";

export const inventoryRouter = Router();

inventoryRouter.get('/', getAllInventory)
inventoryRouter.post('/', createInventory)
inventoryRouter.put('/:id', updateInventory)