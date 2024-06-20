module.exports = (req, res, next) => {
    const { quantity } = req.body;
    if (quantity < 0) {
        return res.status(400).send({ error: 'La cantidad del producto no puede ser menor a 0.' });
    }
    next();
};
