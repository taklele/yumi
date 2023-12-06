import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const query = req.body.query;
    const filePath = path.resolve('./', 'queries.json');

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.status(500).json({ message: 'Error reading file' });
      } else {
        let queries = JSON.parse(data);
        queries.unshift(query); // Add new query to the beginning
        queries = queries.slice(0, 20); // Keep only latest 20 queries

        fs.writeFile(filePath, JSON.stringify(queries), (err) => {
          if (err) {
            res.status(500).json({ message: 'Error writing file' });
          } else {
            res.status(200).json({ message: 'Query added successfully' });
          }
        });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
