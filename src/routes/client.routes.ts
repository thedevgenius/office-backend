import { Router } from "express";
import { createClient } from "../controllers/client.controller";

const router = Router();

router.post("/client/add", createClient);


export default router;