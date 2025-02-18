const express = require("express");
const { rateLimiter } = require("./rate-limiter");

const app = express();

const PORT = 3000;

const USER_RATE_LIMIT_RULE = {
  endpoint: "users",
  rate_limit: {
    time: 60,
    limit: 3,
  },
};

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Chelsi" },
];

app.get("/users", rateLimiter(USER_RATE_LIMIT_RULE), (req, res) => {
  res.status(200).json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
