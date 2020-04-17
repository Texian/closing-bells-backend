const db = require('../models');

const index = async (req, res) => {
    try {
        const users = await db.User.find({});
        if (!users) return res.status(404).json({error: 'No users not found'});
        return res.json(users);
    } catch (err) {
        return res.status(500).json(`User index error: ${err}`);
    }
}

const show = async (req, res) => {
    try {
        console.log(req.user)
        const user = await db.User.findOne({_id: req.params.id}); //Include JWTS in place of params
        if (!user) return res.status(404).json({error: 'User not found'});
        return res.json(user);
    } catch (err) {
        return res.status(500).json(`User show error: ${err}`);
    }
}

const create = async (req, res) => {
    try {
        const newUser = await db.User.create(req.body);
        if (!newUser) return res.status(404).json({error: 'User couldn\'t be created'});
        return res.json(newUser);
    } catch (err) {
        return res.status(500).json(`User create error: ${err}`);
    }
}

const update = async (req, res) => {
    try {
        let userToUpdate = await db.User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
        if (!userToUpdate) return res.status(401).json({error: 'The user with that ID wasn\'t found'});
        return res.json(userToUpdate);
    } catch (err) {
        return res.status(500).json(`User update error: ${err}`);
    }
}

const destroy = async (req, res) => {
    try {
        let destroyUser = await db.User.findOneAndDelete({_id: req.params.id});
        if (!destroyUser) return res.status(404).json({error: 'User with that ID couldn\'t be found'});
        return res.json(destroyUser);
    } catch (err) {
        return res.status(500).json(`User destroy error: ${err}`);
    }
}

const profile  = async (req, res) => {
    try {
        console.log(req.user);
        const profile = await db.User.findOne({
            _id: req.user._id
        });
        if (!profile) return res.status(404).json({error: 'User not found'});
        return res.json(user);
    } catch (err) {
        return res.status(500).json(`Profile fetch error: ${err}`);
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    profile
}