import client from './redisClient.js';

async function test() {
  await client.set('hello', 'world');
  const value = await client.get('hello');
  console.log('Value from Redis:', value);
  process.exit(0);
}

test();
