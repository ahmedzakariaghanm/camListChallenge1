const user = require('./user')
const joi = require('joi');
const bids = []

const pets = [
    {
        id: 1,
        name: 'bird'
    },
    {
        id: 2,
        name: 'cat'
    },
    {
        id: 3,
        name: 'dog'
    }
];

const addBidOnPetSchema = joi
    .object({
        petId: joi.number().integer().strict().required(),
        userId: joi.number().integer().strict().required(),
        bid: joi.number().positive().strict().required()
    })
    .required();

const getBidOnPetSchema = joi
    .object({
        petId: joi.number().integer().strict().required()
    })
    .required();

const isPetExists = (petId) => {
    const indexOfPet = pets.map(pet => pet.id).indexOf(petId);
    if (indexOfPet === -1) return false;
    else return true;
}

const deleteOldBidIfExists = (userId, petId) => {
    for (let i = 0; i < bids.length; i++) {
        if (bids[i].userId == userId && bids[i].petId == petId) {
            bids.splice(i, 1);
        }
    }
}

const addBidOnPet = (req, res) => {
    const userId = req.body.userId;
    const petId = req.body.petId;
    const bid = req.body.bid;
    const validation = addBidOnPetSchema.validate({
        userId,
        petId,
        bid
    })
    if (validation.error) {
        res.status(400).json({ message: validation.error.details[0].message, data: null });
    }
    else if (!user.isUserExists(userId)) {
        res.status(404).json({ message: 'User not found', data: null });
    }
    else if (!isPetExists(petId)) {
        res.status(404).json({ message: 'Pet not found', data: null });
    }
    else {
        deleteOldBidIfExists(userId, petId);
        bids.push({
            userId,
            petId,
            bid
        })
        res.status(200).json({ message: null, data: null });
    }
};

const getAllBidsOnPet = (req, res) => {
    const petId = Number(req.params.petId);
    const validation = getBidOnPetSchema.validate({
        petId
    })
    if (validation.error) {
        res.status(400).json({ message: validation.error.details[0].message, data: null });
    }
    else if (!isPetExists(petId)) {
        res.status(404).json({ message: 'Pet not found', data: null });
    }
    else {
        let PetBids = bids.filter(bid => bid.petId == petId)
        res.status(200).json({ message: null, data: PetBids });
    }
};

module.exports = {
    addBidOnPet,
    getAllBidsOnPet
};

