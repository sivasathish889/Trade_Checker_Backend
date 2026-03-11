import { prisma } from '../db/prisma.js';

export const updateChecklist = async (req, res) => {
  try {
    const items = req.body;
    const userId = req.user.id;

    // Delete existing items for the user
    await prisma.checklistItem.deleteMany({ where: { userId } });

    if (items.length > 0) {
      const itemsWithUser = items.map(i => ({ ...i, userId }));
      await prisma.checklistItem.createMany({ data: itemsWithUser });
    }
    
    res.json({ message: 'Checklist updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error updating checklist' });
  }
};
