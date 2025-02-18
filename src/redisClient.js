const { createClient } = require("redis");

const REDIS_CONFIG = {
  HOST: "127.0.0.1",
  PORT: 6379,
  PASSWORD: "", // your redis password
};

const redisClient = createClient({
  socket: {
    host: REDIS_CONFIG.HOST,
    port: REDIS_CONFIG.PORT,
  },
  password: REDIS_CONFIG.PASSWORD,
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Connected to Redis");
  }
}

connectRedis();

module.exports = { redisClient };
