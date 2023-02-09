import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './Routes/Authrouter.js';
import userRoutes from './Routes/Userrouter.js';
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();
const port = process.env.PORT || 5000;
const url = process.env.MONGO_URL;
mongoose.set('strictQuery', true); // to avoid deprecation warning
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.use('/auth', authRoutes);
app.use("/users", userRoutes);




// app.post('/token', async function (req, res) {
//     // const datas = await User.find({ field: "UserName" })

//     console.log(req.body)
//     res.json({
//         Token: "token",
//     })
//     // console.log(datas)
// })


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});