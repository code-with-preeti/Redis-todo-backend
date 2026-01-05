import client from './redisClient.js';

async function startWorker() {
  console.log('🚀 Worker started...');

  while (true) {
    try {
      const result = await client.brPop('tasks', 0);
      const taskId = result.element;
      const taskKey = `task:${taskId}`;

      console.log(`Processing task: ${taskId}`);

      await client.hSet(taskKey, 'completed', 'true');

      console.log(`Task completed: ${taskId}`);
    } catch (err) {
      console.error('Worker error:', err.message);
     
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

startWorker();
