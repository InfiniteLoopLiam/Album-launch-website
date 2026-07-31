import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Step 1 : Get the exact file path of index.js
const __filename = fileURLToPath(import.meta.url);

// Step 2: Get the directory containing index.js
const __dirname = path.dirname(__filename);

// Step 3: Initialise express
const app = express();
const PORT = process.env.PORT || 3000;

// Step 4: Combine the directory with your 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Step 5: Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});