import { prisma } from '../db/prisma.js';

export const createTemplate = async (req, res) => {
  try {
    const template = req.body;
    const userId = req.user.id;
    
    await prisma.template.create({
      data: {
        id: template.id,
        name: template.name,
        items: template.items,
        userId: userId
      }
    });

    res.json(template);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error saving template' });
  }
};

export const deleteTemplate = async (req, res) => {
  try {
    const userId = req.user.id;
    await prisma.template.delete({ 
      where: { 
        id_userId: {
          id: req.params.id,
          userId: userId
        }
      } 
    });
    res.json({ message: 'Template deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error deleting template' });
  }
};
