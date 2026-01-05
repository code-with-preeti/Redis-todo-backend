import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import client from './redisClient.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Todo Backend is running'));

app.post('/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const id = Date.now().toString();

    await client.hSet(`task:${id}`, {
      title,
      description: description || '',
      completed: 'false', 
    });

    await client.lPush('tasks', id);

    res.status(201).json({ id, title, description: description || '', completed: false });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const ids = await client.lRange('tasks', 0, -1);
    const tasks = [];

    for (const id of ids) {
      const task = await client.hGetAll(`task:${id}`);
      if (Object.keys(task).length > 0) {
        tasks.push({ id, ...task, completed: task.completed === 'true' });
      }
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const taskKey = `task:${id}`;

    const exists = await client.exists(taskKey);
    if (!exists) return res.status(404).json({ message: 'Task not found' });

    if (updates.completed !== undefined) updates.completed = updates.completed.toString();
    if (updates.title !== undefined) updates.title = updates.title.toString();
    if (updates.description !== undefined) updates.description = updates.description.toString();

    await client.hSet(taskKey, updates);

    const updatedTask = await client.hGetAll(taskKey);
    res.json({
      id,
      title: updatedTask.title,
      description: updatedTask.description,
      completed: updatedTask.completed === 'true',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const taskKey = `task:${id}`;

    const exists = await client.exists(taskKey);
    if (!exists) return res.status(404).json({ message: 'Task not found' });

    await client.del(taskKey);
    await client.lRem('tasks', 0, id);

    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
