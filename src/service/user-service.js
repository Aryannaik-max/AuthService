const UserRepository = require('../repository/user-repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(userData) {
        try {
            const user = await this.userRepository.create(userData);
            return user;
        } catch (error) {
            console.error('Error in UserService while creating user:', error);  
            throw error;
        }
    }

    async SignIn(email, plainPassword) {
        try {
            const user = await this.userRepository.getByEmail(email);
            const passwordMatch = await this.checkPassword(plainPassword, user.password);

            if(!passwordMatch){
                console.error('Password does not match for user:', email);
                throw new Error('Invalid credentials');
            }
            if(!user){
                console.error('User not found with email:', email);
                throw new Error('User not found');
            }
            const jwtToken = this.createToken({email: user.email, id: user.id});
            return jwtToken;
        } catch (error) {
            console.error('Error in UserService while signing in:', error);
            throw error;
        }
    }

    async checkPassword(plainPassword, hashedPassword) {
        try {
            return bcrypt.compareSync(plainPassword, hashedPassword);
        } catch (error) {
            console.error('Error in UserService while checking password:', error);
            throw error;
        }
    }

    async createToken(payload) {
        try {
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
            return token;
        } catch (error) {
            console.error('Error in UserService while creating token:', error);
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = await this.verifyToken(token);
            if(!response) {
                console.error('Token verification failed');
                throw new Error('Unauthorized');
            }

            const user = await this.userRepository.getById(response.id);
            if(!user) {
                console.error('User not found for token:', response.id);
                throw new Error('Unauthorized');
            }
            return user.id;
        } catch (error) {
            console.error('Error in UserService while checking authentication:', error);
            throw error;
        }
    }

    async verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_SECRET);
            return response;
        } catch (error) {
            console.error('Error in UserService while verifying token:', error);
            throw error;
        }
    }

    async isAdmin(userId) {
        try {
            return await this.userRepository.isAdmin(userId);
        } catch (error) {
            console.error('Error in UserService while checking if user is admin:', error);
            throw error;
        }
    }

}



module.exports = UserService;