import { prisma } from '../db/prisma.js';

export async function initDB() {
  try {
    // Database check (optional schema validation step)
    await prisma.$queryRaw`SELECT 1`;
    console.log('Prisma Database Initialized Successfully!');
  } catch (err) {
    if (err.code === 'P1001') {
      console.error('MySQL connection refused. Please ensure your MySQL server is running properly.');
    } else {
      console.error('Prisma Initialization Error:', err);
    }
  }
}
