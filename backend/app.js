const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const cors = require("cors");
const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const orderRoutes = require("./routes/order")
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const authRoutes = require("./routes/auth");
const { verifyToken, isAdmin } = require("./middleware/auth-middleware");
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Server running");
});
app.use("/category", verifyToken, isAdmin, categoryRoutes);
app.use("/brand", verifyToken, isAdmin, brandRoutes);
app.use("/orders", verifyToken, isAdmin, orderRoutes);
app.use("/product", verifyToken, isAdmin, productRoutes);
app.use("/customer", verifyToken, customerRoutes);
app.use("/auth", authRoutes)

async function connectDb() {
    await mongoose.connect("mongodb+srv://farhanjaffer24:oz3HjmNbswHPdvd3@cluster0.iavbse7.mongodb.net/", {
        dbName: "ECOM_db",
    });
    console.log("mongodb connected");
}
connectDb().catch((err) => {
    console.error(err);
})
app.listen(port, () => {
    console.log("Server is working on port", port);
})