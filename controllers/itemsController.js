const db = require('../models');

const index = async (req, res) => {
    try {
        const items = await db.Item.find({});
        if (!items) return res.status(404).json({error: 'No items not found'});
        return res.json(items);
    } catch (err) {
        return res.status(500).json(`Item index error: ${err}`);
    }
}

const show = async (req, res) => {
    try {
        const item = await db.Item.findOne({_id: req.params.id});
        if (!item) return res.status(404).json({error: 'Item not found'});
        return res.json(item);
    } catch (err) {
        return res.status(500).json(`Item show error: ${err}`);
    }
}

const create = async (req, res) => {
    try {
        const newItem = await db.Item.create(req.body);
        if (!newItem) return res.status(404).json({error: 'Item couldn\'t be created'});
        return res.json(newItem);
    } catch (err) {
        return res.status(500).json(`Item create error: ${err}`);
    }
}

const update = async (req, res) => {
    try {
        let itemToUpdate = await db.Item.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
        if (!itemToUpdate) return res.status(401).json({error: 'The item with that ID wasn\'t found'});
        return res.json(itemToUpdate);
    } catch (err) {
        return res.status(500).json(`Item update error: ${err}`);
    }
}

const destroy = async (req, res) => {
    try {
        let destroyItem = await db.Item.findOneAndDelete({_id: req.params.id});
        if (!destroyItem) return res.status(404).json({error: 'Item with that ID couldn\'t be found'});
        return res.json(destroyItem);
    } catch (err) {
        return res.status(500).json(`Item destroy error: ${err}`);
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy
}