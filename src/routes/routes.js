const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/index');



router.get('/restaurants', async (req, res) => {
  try {
    const rests = await Restaurant.findAll();
    if (rests) res.status(200).json(rests);
  } catch (err) {
    res.send(err);
  }
});

router.get('/restaurants/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const rest = await Restaurant.findByPk(id);
    if (rest) res.status(200).json(rest);
  } catch (err) {
    res.send(err);
  }
});

router.post('/restaurants', 
async (req, res) => {
  try {
    const newRestaurant = await Restaurant.create(req.body);
    res.status(201).json(newRestaurant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/restaurants/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedRestaurant = await Restaurant.findByPk(id);
    if (updatedRestaurant) {
      await updatedRestaurant.update(req.body);
      res.status(200).json(updatedRestaurant);
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/restaurants/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedRestaurant = await Restaurant.findByPk(id);
    if (deletedRestaurant) {
      await deletedRestaurant.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;