import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { query } = req.body;

      // 获取当前的查询列表
      let queries = await kv.get('queries');
      if (!queries) {
        queries = [];
      }

      // 将新域名添加到数组的开头
      queries.unshift(query);

      // 如果数组长度超过限定值，移除末尾元素
      if (queries.length > 20) {
        queries.pop();
      }

      // 更新KV中的queries
      await kv.set('queries', queries);

      res.status(200).json({ message: 'Query added successfully' });
    } catch (error) {
      console.error('Error in adding query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // 处理非POST请求
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
