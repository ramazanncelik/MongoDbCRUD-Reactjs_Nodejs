const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const FoodModel = require('./models/Food')

app.use(express.json());
app.use(cors());

mongoose.connect(your_mongo_server, {
    useNewUrlParser: true
});

app.post("/insert", async (req, res) => {
    const foodName = req.body.foodName;
    const days = req.body.days;
    const food = new FoodModel({ foodName: foodName, daysSinceIAte: days });
    try {
        await food.save();
        res.send('saved data.')
    } catch (error) {
        console.log(error)
    }
});

app.get("/read", async (req, res) => {
    FoodModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    })
});

app.put("/update", async (req, res) => {
    const id = req.body.id;
    const newFoodName = req.body.newFoodName;

    try {
        await FoodModel.findById(id, (err, updatedFood) => {
            updatedFood.foodName = newFoodName
            updatedFood.save();
            res.send('update');
        });
    } catch (error) {
        console.log(error)
    }
});

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await FoodModel.findByIdAndDelete(id).exec();
    } catch (error) {
        console.log(error)
    }
});

app.listen(3001, () => {
    console.log("Server running on port 3001...")
})
