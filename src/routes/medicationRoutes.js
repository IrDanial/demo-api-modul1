import express from "express"; 
import { MedicationController } from "../controllers/medicationController.js"; 

import { validateMedication } from "../middlewares/medicationValidator.js";
 
const router = express.Router(); 
 
router.get("/search", MedicationController.searchByName);
router.get("/", MedicationController.getAll); 
router.get("/paginated", MedicationController.getPaginated);
router.get("/:id", MedicationController.getById); 

router.post("/", validateMedication, MedicationController.create);

router.put("/:id", MedicationController.update); 
router.delete("/:id", MedicationController.remove); 

export default router;