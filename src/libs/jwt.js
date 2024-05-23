const jwt = require('jsonwebtoken');


function generateJwt(payload, expiresIn = '1d') {

    const newJwt = jwt.sign( payload, process.env.JWT_SECRET, {expiresIn} );
    return newJwt;
}


module.exports = { generateJwt }


