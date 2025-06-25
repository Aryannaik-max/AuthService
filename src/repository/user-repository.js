const { User } = require('../models/index');

class UserRepository {

    async create(userData){
        try {
            const user = await User.create(userData);
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async getByEmail(email) {
        try {
            const user = await User.findOne({
                where: { email}
            });
            return user;
        } catch (error) {
            console.error('Error fetching user by email:', error);
            throw error;
        }
    }

    async getById(Id) {
        try {
            const user = await User.findByPk(Id);
            return user;
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw error;
        }
    }

    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId)
            const AdminRole = await user.findOne({
                where: {
                    name: 'ADMIN'
                }
            });
            return user.hasRole(AdminRole);
        } catch (error) {
            console.error('Error checking if user is admin:', error);
            throw error;
            
        }
    }

}

module.exports = UserRepository;