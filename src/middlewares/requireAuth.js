const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('Myuser');

module.exports = (req, res, next) => {
    const {authorization} = req.headers;

    if(!authorization) {
        return res.status(401).send({error: 'You must be logged in.'});
    }

    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
        console.log(payload);
        if(err){
            return res.status(401).send({error: 'You must be logged in.'});
        }

        const {userId} = payload;
        // console.log(payload);

        const user = await User.findById(userId);
        // console.log(userFound);
        req.user = user;
        next();
    })
}