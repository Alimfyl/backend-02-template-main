require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT) || 3005;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    app.listen(port, host, () => {
      console.log(`Server is running at http://${host}:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

startServer();