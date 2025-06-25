const validateAuthRequest = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Email and password are required',
            err: {}
        });
    }
    next();
}

const validateIsAdminRequest = (req, res, next) => {
    if(!req.body.userId) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Id is required',
            err: {}
        });
    }
    next();
}

module.exports = {
    validateAuthRequest,
    validateIsAdminRequest
};