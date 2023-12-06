import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const filePath = path.resolve('./', 'queries.json');

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.status(500).json({ message: 'Error reading file' });
      } else {
        const queries = JSON.parse(data);
        res.status(200).json(queries);
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
