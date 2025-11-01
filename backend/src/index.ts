import express from 'express';
import cors from 'cors';
import { query } from './db';

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for frontend
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Example route: GET todos
app.get('/todos', async (req, res) => {
  try {
    const result = await query('SELECT * FROM todos');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Example route: POST a todo
app.post('/todos', async (req, res) => {
  const { text } = req.body;
  try {
    const result = await query('INSERT INTO todos (text) VALUES ($1) RETURNING *', [text]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.delete('/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      res.status(404).send('Todo not found');
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});