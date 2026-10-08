const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {

    res.json({
        message: "Cloud Expense Tracker API is running!"
    });

});


app.get("/transactions", (req, res) => {

    res.json({
        transactions: []
    });

});


app.post("/transactions", (req, res) => {

    const { title, amount, type } = req.body;

    if (!title || !amount || !type) {

        return res.status(400).json({
            message: "All fields are required."
        });

    }

    res.status(201).json({
        message: "Transaction added successfully.",
        transaction: {
            title,
            amount,
            type
        }
    });

});


app.delete("/transactions/:id", (req, res) => {

    res.json({
        message:
            `Transaction ${req.params.id} deleted successfully.`
    });

});


app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});