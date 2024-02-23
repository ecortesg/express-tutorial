import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { logger } from "./middleware/logEvents.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { rootRouter } from "./routes/root.js";
import { employeesRouter } from "./routes/api/employees.js";
import { registerRouter } from "./routes/register.js";
import { authRouter } from "./routes/auth.js";
import { corsOptions } from "./config/corsOptions.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3500;

// Custom middleware logger
app.use(logger);

// Third-party middleware for Cross Origin Resource Sharing

app.use(cors(corsOptions));

// Built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// Built-in middleware for json
app.use(express.json());

// Built-in middleware to serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// Routes
app.use("/", rootRouter);
app.use("/employees", employeesRouter);
app.use("/register", registerRouter);
app.use("/auth", authRouter);

// Catch 404
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
