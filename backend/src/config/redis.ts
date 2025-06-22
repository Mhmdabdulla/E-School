import Redis from 'ioredis';

const RedisClient = new Redis({
  host: '127.0.0.1', // or your docker container IP
  port: 6379,
  // password: process.env.REDIS_PASSWORD, // optional
});

RedisClient.on('connect', () => {
  console.log('✅ Redis connected');
});

RedisClient.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

export default RedisClient;
