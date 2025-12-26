const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model');
const authMiddleware = require('../middlewares/auth.middleware');


async function getCurrentPartner(req, res) {
    try {
        const foodPartner = req.foodPartner;
        
        if (!foodPartner) {
            return res.status(404).json({
                message: 'Food Partner not found'
            });
        }

        const foodItems = await foodModel.find({ foodPartner: foodPartner._id });

        res.status(200).json({
            message: 'Food Partner fetched successfully',
            foodPartner: {
                ...foodPartner.toObject(),
                videos: foodItems
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function updatePartnerProfile(req, res) {
    try {
        const { name, contactName, phone, address } = req.body;
        const foodPartnerId = req.foodPartner._id;

        const updatedPartner = await foodPartnerModel.findByIdAndUpdate(
            foodPartnerId,
            {
                name,
                contactName,
                phone,
                address
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: 'Food Partner profile updated successfully',
            foodPartner: updatedPartner
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function getFoodPartnerById(req, res) {

    const foodPartnerId = req.params.id;

    const foodPartner = await foodPartnerModel.findById(foodPartnerId);
    const foodIteamsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId });


    if (!foodPartner) {
        return res.status(404).json({
            message: 'Food Partner not found'
        });
    }


    res.status(200).json({
        message: 'Food Partner fetched successfully',
        foodPartner :{
            ...foodPartner.toObject(),
            foodItems: foodIteamsByFoodPartner
        }
    });
}

module.exports = {
    getCurrentPartner,
    updatePartnerProfile,
    getFoodPartnerById,
}