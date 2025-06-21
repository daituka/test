const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const DATA_FILE = path.join(__dirname, 'diary-data.json');

function readDiary() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function writeDiary(entries) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2));
}

app.get('/api/diary', (req, res) => {
  res.json(readDiary());
});

app.post('/api/diary', (req, res) => {
  const { text } = req.body;
  if (typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'Invalid text' });
  }
  const entries = readDiary();
  entries.push({ date: new Date().toISOString(), text: text.trim() });
  writeDiary(entries);
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
