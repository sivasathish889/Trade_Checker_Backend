import { prisma } from '../db/prisma.js';

export const createTrade = async (req, res) => {
  try {
    const trade = req.body;
    const userId = req.user.id;
    
    const newTrade = await prisma.trade.create({
      data: {
        id: trade.id,
        date: new Date(trade.date),
        pair: trade.pair,
        direction: trade.direction,
        timeframe: trade.timeframe,
        session: trade.session || null,
        risk: trade.risk,
        lotSize: trade.lotSize,
        entryReason: trade.entryReason || null,
        notes: trade.notes || null,
        screenshot: trade.screenshot || null,
        checklistResults: trade.checklistResults,
        score: trade.score,
        userId
      }
    });

    res.json(newTrade);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error saving trade' });
  }
};

export const deleteTrade = async (req, res) => {
  try {
    const userId = req.user.id;
    await prisma.trade.delete({ 
      where: { 
        id_userId: {
          id: req.params.id,
          userId: userId
        }
      } 
    });
    res.json({ message: 'Trade deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error deleting trade' });
  }
};
