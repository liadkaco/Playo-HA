import express from 'express';
import mongoose from 'mongoose';
import router from './Routes/missionRouter';
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

const connectDB = async () => {
  const uri = "mongodb+srv://77liad:VoyD9Khva2wqoksp@tododb.maxbv.mongodb.net/todoDB?retryWrites=true&w=majority";
  await mongoose
    .connect(uri, {
      serverApi: { version: "1", strict: true, deprecationErrors: true },
    })
    .then(() => console.log("successfully connected to DB"))
    .catch((err) => {console.error("Could not connect to MongoDB", err); process.exit(1);});
};

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
