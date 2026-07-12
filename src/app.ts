import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import routes from "./routes/index.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, "../public");

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "../src/views"));
app.use(express.static(publicDir));

app.use(routes);

export default app;
