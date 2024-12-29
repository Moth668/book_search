import type { Request, Response } from 'express'; // Import type definitions from Express.js
import express from 'express'; // Import express
import path from 'node:path'; // Import path module from Node.js
import { fileURLToPath } from 'node:url'; // Import fileURLToPath function from Node.js

const __filename = fileURLToPath(import.meta.url); // Get the current file path
const __dirname = path.dirname(__filename); // Get the directory name of the current file

const router = express.Router(); // Create a new router

// Serve React front-end in production
router.use((_req: Request, res: Response) => { // Define a route handler for all requests
  res.sendFile(path.join(__dirname, '../../client/build/index.html')); // Send the index.html file
}); // End of route handler

export default router; // Export the router
