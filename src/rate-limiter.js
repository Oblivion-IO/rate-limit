const { redisClient } = require("./redisClient");

/**
 * @param {Object} rule
 * @param {string} rule.endpoint
 * @param {Object} rule.rate_limit
 * @param {number} rule.rate_limit.time
 * @param {number} rule.rate_limit.limit
 * @returns {Function}
 */
function rateLimiter(rule) {
  const { endpoint, rate_limit } = rule;

  return async (req, res, next) => {
    const ipAddrs = req.ip;
    const redisId = `${endpoint}/${ipAddrs}`;

    const reqs = await redisClient.incr(redisId);

    if (reqs === 1) {
      await redisClient.expire(redisId, rate_limit.time);
    }

    if (reqs > rate_limit.limit) {
      return res.status(429).send({ message: "Too Many Requests" });
    }

    next();
  };
}

module.exports = { rateLimiter };
