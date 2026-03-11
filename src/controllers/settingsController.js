import { prisma } from '../db/prisma.js';

export const updateSettings = async (req, res) => {
  try {
    const settings = req.body;
    const userId = req.user.id;

    await prisma.settings.upsert({
      where: { userId: userId },
      update: { customSessions: settings.customSessions },
      create: { customSessions: settings.customSessions, userId: userId }
    });
    res.json({ message: 'Settings updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error updating settings' });
  }
};
