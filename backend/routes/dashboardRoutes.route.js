import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.middleware.js";
import { dashboardSummary } from "../controllers/dashboardController.controller.js";

const router = express.Router();

router.get("/summary", protect, adminOnly, dashboardSummary);

export default router;