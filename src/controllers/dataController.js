import { prisma } from '../db/prisma.js';

export const getAllData = async (req, res) => {
  try {
    const userId = req.user.id;

    const checklistItems = await prisma.checklistItem.findMany({ 
      where: { userId }, 
      orderBy: { order: 'asc' } 
    });
    
    const trades = await prisma.trade.findMany({ 
      where: { userId }, 
      orderBy: { date: 'desc' } 
    });
    
    const templates = await prisma.template.findMany({
      where: { userId }
    });
    
    const settingsRecord = await prisma.settings.findUnique({
      where: { userId }
    });

    res.json({
      checklistItems,
      trades,
      templates,
      settings: settingsRecord || { customSessions: ['Asian Session', 'London Session', 'New York Session', 'London/NY Overlap'] }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error fetching data' });
  }
};
