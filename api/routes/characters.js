const express = require('express');
const router = express.Router();
const Character = require('../models/character.js');

router.get('/', async (req, res) => {
    try{
        const characters = await Character.find();
        res.json(characters);
    } 
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', getCharacterFromId, (req, res) => {
    res.send(res.character);
});

router.post('/', async (req, res) => {
    const character = new Character({
        name: req.body['name'],
        division: req.body['division'],
        dateJoined: req.body['dateJoined'],
        lastPromotionDate: req.body['lastPromotionDate']
    });

    try {
        const newCharacter = await character.save();
        res.status(201).json(newCharacter);
    } 
    catch (err) {
        res.status(400).json({ message: err.message })
    }
});

router.patch('/:id', getCharacterFromId, async (req, res) => {
    let changes = Object.keys(req.body);
    
    for (key of changes) {
        res.character[key] = req.body[key];
    }

    try {
        const newCharacter = await res.character.findOneAndUpdate(
            
        )
        res.status(201).json(newCharacter);
    } 
    catch (err) {
        res.status(400).json({ message: err.message })
    }
});

router.delete('/:id', getCharacterFromId, async (req, res) => {
    try {
        await res.character.remove();
        res.json({ message: "Character removed." })
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getCharacterFromId(req, res, next) {
    try {
        character = await Character.findById(req.params.id);

        if (!character)
            return res.status(404).json({ message: "Cannot find character."});
    }
    catch (err) {
        if (err['path'] == '_id') 
            return res.status(404).json({ message: "Cannot find character."});

        return res.status(500).json({ message: err.message });
    }

    res.character = character;
    next();
}

module.exports = router;