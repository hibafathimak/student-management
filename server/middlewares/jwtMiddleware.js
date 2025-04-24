const jwt = require('jsonwebtoken')

const jwtMiddleware =  (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1]
    if (token) {
        try {
            jwt.verify(token, process.env.JWTPASSWORD)
            next()
        } catch (error) {
            console.log(error)
            res.status(403).json("Invalid Token...Authorization failed...")
        }
    } else {
        res.status(401).json("Authorization Failed...Token is Missing...")
    }
}

module.exports = jwtMiddleware
