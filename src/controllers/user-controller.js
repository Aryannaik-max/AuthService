const UserService = require('../service/user-service');
const userService = new UserService();

const create = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        return res.status(201).json({
            data: user,
            success: true,
            message: 'User created successfully',
            err: {}
        });
    } catch (error) {
        console.log('Error in UserController while creating user:', error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Error creating user',
            err: error
        });
    }
}

const SignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await userService.SignIn(email, password);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'User signed in successfully',
            err: {}
        });
    } catch (error) {
        console.log('Error in UserController while signing in:', error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Error signing in',
            err: error
        }); 
    }
}

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'User is authenticated',
            err: {}
        });
    } catch (error) {
        console.log('Error in UserController while checking authentication:', error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Error checking authentication',   
            err: error
        });
    }
}

const isAdmin = async (req, res) => {
    try {
        const response = await UserService.isAdmin(req.body.userId);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'User admin status checked successfully',
            err: {}
        });
    } catch (error) {
        console.log('Error in UserController while checking admin status:', error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Error checking admin status',
            err: error
        });
        
    }
}

module.exports = {
    create,
    SignIn,
    isAuthenticated,
    isAdmin
};