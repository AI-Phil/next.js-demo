import { NextApiRequest, NextApiResponse } from 'next';
import { similaritySearch } from '@/services/cassandraService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query.query;
  const documentsToFind = req.query.DocumentsToFind ? parseInt(req.query.DocumentsToFind as string) : 1; 
  const groupId = typeof req.query.groupId === 'string' ? req.query.groupId : '';

  if (typeof query === 'string') {
    const results = await similaritySearch(query, documentsToFind, groupId);
    res.status(200).json({ results });
  } else {
    res.status(400).json({ error: 'Invalid query parameter' });
  }
}
