import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    try {
      const newLogbookEntry = await prisma.logbookTipping.create({
        data
      });
      res.status(200).json(newLogbookEntry);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create logbook entry' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
