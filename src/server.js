const app = require('./app');
const prisma = require('./config/prisma');
require('dotenv').config();
const port = process.env.PORT || 4001;

const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


const os = require('os');
console.log(os.platform());
console.log('ini dijalankan')

async function shutdown() {
  console.log('Shutting down...');
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
