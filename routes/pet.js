const express = require('express');
const router = express.Router();
const petController = require('../controllers/pet');

router.post('/pet/bid', petController.addBidOnPet);
router.get('/pet/bid/:petId', petController.getAllBidsOnPet);

module.exports = router;