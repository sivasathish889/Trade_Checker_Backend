import { prisma } from '../db/prisma.js';

export const updateChecklist = async (req, res) => {
  try {
    console.log(req.body)
    const rawItems = req.body;
    const userId = req.user.id;

    if (!Array.isArray(rawItems)) {
      return res.status(400).json({ error: 'Request body must be an array' });
    }

    // Strip only the fields Prisma knows about — avoids "Unknown arg" errors
    // from extra keys Flutter / React might send (e.g. "User", unknown fields)
    const items = rawItems.map((i, idx) => ({
      id: String(i.id ?? `item-${Date.now()}-${idx}`),
      text: String(i.text ?? ''),
      isMandatory: Boolean(i.isMandatory ?? i.is_mandatory ?? false),
      category: String(i.category ?? 'entry'),
      order: Number(i.order ?? idx),
      userId,
    }));

    // Atomic delete-then-create inside a transaction so partial failures roll back
    await prisma.$transaction([
      prisma.checklistItem.deleteMany({ where: { userId } }),
      ...(items.length > 0
        ? [prisma.checklistItem.createMany({ data: items })]
        : []),
    ]);

    res.json({ message: 'Checklist updated', count: items.length });
  } catch (err) {
    console.error('Checklist update error:', err);
    res.status(500).json({ error: 'Database error updating checklist', detail: err.message });
  }
};

