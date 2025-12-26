const express = require("express");
const foodPartnerController = require('../controllers/food-partner.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Get current partner profile (protected)
router.get('/me',
    authMiddleware.authFoodPartner,
    foodPartnerController.getCurrentPartner
);

// Update partner profile (protected)
router.put('/update-profile',
    authMiddleware.authFoodPartner,
    foodPartnerController.updatePartnerProfile
);

// Get partner by ID (public)
router.get('/:id',
    foodPartnerController.getFoodPartnerById
);

module.exports = router;