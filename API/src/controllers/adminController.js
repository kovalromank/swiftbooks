const userModel = require('../models/userModel');



exports.get_users = async (req, res) => {
    try {
        const user_details = await userModel.getUsers();
        
        return res.status(200).json(user_details);
    } catch (error) {
        return res.status(500).json({message: 'Failed to get user details.'});
    }
}


exports.change_user_status = async (req, res) => {
    try {
        const { user_id, status_string } = req.body; //expects status string of either 'user' (change back to regular user) or 'manager' to set as manager status

        await userModel.changeUserStatus(user_id, status_string);
        
        return res.status(200).json({message: 'Successfully updated user status'});
    } catch (error) {
        return res.status(500).json({message: 'Failed to update user status.'});
    }
}


exports.change_user_active = async (req, res) => {
    try {
        const { user_id, active } = req.body; // active expects bool 

        await userModel.changeUserActive(user_id, active);
        
        return res.status(200).json({message: 'Successfully updated user activity'});
    } catch (error) {
        return res.status(500).json({message: 'Failed to update user activity.'});
    }
}