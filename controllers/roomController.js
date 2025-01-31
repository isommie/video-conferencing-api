const { v4: uuidv4 } = require('uuid');

const createRoom = (req, res) => {
    const roomId = uuidv4();
    res.json({ roomId });
};

module.exports = { createRoom };