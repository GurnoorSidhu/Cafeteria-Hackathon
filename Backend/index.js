const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;
app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); 
       res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });
const HOST = "192.168.54.63";
const { ConnectMongoDB } = require("./connection");
const { CheckforAuthCookie } = require("./middlewares/auth");
const router = require("./routes/user");
const itemRouter = require("./routes/items");
const reviewRouter = require("./routes/review")
const updateorder = require("./routes/order")
const verifyotp = require("./routes/otp")

app.listen(PORT, () => console.log(`Server Running on PORT:${PORT}`));
ConnectMongoDB("mongodb+srv://gurnoor8520:mrdewsis@cluster0.hfshp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/cafetria-hackathon")
  .then(() => console.log("MongoDB Connected Successfully."))
  .catch((err) => console.log("Error Connecting MongoDB", err));


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(CheckforAuthCookie("token"));
app.use(express.json());
app.use(cors({
  origin:["https://cafeteria-hackathon-frontend.vercel.app"],
  methods:["POST","GET"],
  credentials:true
}));

// app.use("/api/geocode/",MapRouter)
app.use("/api/add-new/",itemRouter)
app.use("/api/review",reviewRouter)
app.use("/api", router);
app.use("/api/verify",verifyotp);
app.use("/api/update",updateorder);
app.get("/test",(req,res)=>{
  return res.send("testing");
})
