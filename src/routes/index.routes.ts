import { Router } from "express";
import { healthCheck } from "../controllers/health.controller.js";
import { renderIndexPage } from "../controllers/page.controller.js";

const router = Router();

router.get("/health", healthCheck);
router.get("/", renderIndexPage);

export default router;
