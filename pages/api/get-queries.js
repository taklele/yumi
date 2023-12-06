import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // 从KV获取queries
      const queries = await kv.get('queries');

      if (queries) {
        res.status(200).json(queries);
      } else {
        // 如果没有找到queries，则返回空数组
        res.status(200).json([]);
      }
    } catch (error) {
      console.error('Error fetching recent queries:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // 处理非GET请求
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
