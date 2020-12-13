import { Request, Response } from 'express';
import { chalkLog } from '../utils/chalkLog';
// const redis = require("redis");
import redis from 'redis';
console.log("$# REDIS Config @7");

class RedisMock {
  get() {
    return {}
  }
  setex() {
    return {}
  }
}
const redis_mock = new RedisMock()

const makeClient: any = () => {
  console.log('redis client');
  console.log(process.env.REDIS_CACHE_DISABLE);
  if (process.env.REDIS_CACHE_DISABLE == 'true') {
    chalkLog('blueBright', `redis disable true`)
    return redis_mock
  } else {
    chalkLog('blueBright', `redis disable false`)
    console.log('redis disable false');
    
    return process.env.DOCKER
      ? redis.createClient(process.env.REDIS_PORT, process.env.REDIS_SERVICE)
        : redis.createClient(process.env.REDIS_PORT);
  }
}

export const redis_client = makeClient();

export const redisMiddleware = (req: Request, res: Response, next) => {
  // console.log(Object.keys(req));
  chalkLog('green', '#### redis middleware ####')
  const { queryType } = req.query;
  if (queryType) {
    chalkLog('blueBright', `queryType: ${queryType}`)
    chalkLog('green', redis_client)
    redis_client.get(queryType, (err, data) => {
      chalkLog("yellow", "redis_client get");
      if (err) {
        chalkLog('red', err);
        res.status(500).send(err);
      }
      if (data != null) {
        // chalkLog('yellow', JSON.parse(data))
        const out = { data: {} }
        out.data[queryType.toString()] = JSON.parse(data);
        res.send(out);
      } else {
        next();
      }
    });
    } else {
      next();
  }
};
