import mongoose from 'mongoose'; // Import mongoose

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks'); // Connect to MongoDB

export default mongoose.connection; // Export connection
