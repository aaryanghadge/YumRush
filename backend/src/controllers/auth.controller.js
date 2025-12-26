const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodpartner.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    try {
        const { fullName, email, password } = req.body;
        
        // Add validation
        if (!fullName || !email || !password) {
            return res.status(400).json({ 
                message: 'All fields are required' 
            });
        }

        const isUserAlreadyexist = await userModel.findOne({ email });

        if (isUserAlreadyexist) {
            return res.status(400).json({ 
                message: 'User already exists' 
            });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            fullName,
            email,
            password: hashpassword
        });

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' } // Add expiration
        );

        res.cookie('token', token, { 
            httpOnly: false, 
            maxAge: 24 * 60 * 60 * 1000 
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Register error:', error); // ADD THIS LINE
        res.status(500).json({
            message: error.message
        });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
            },process.env.JWT_SECRET
        );

        res.cookie('token', token, { 
            httpOnly: false, 
            maxAge: 24 * 60 * 60 * 1000 
        });

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName,
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

function logoutUser(req, res) {
    res.clearCookie('token');
    res.status(200).json({
        message: 'User logged out successfully'
    });
}

async function registrerFoodPartner(req, res) {

    const { name, email, password, phone, address, contactName,} = req.body;
    const isAccountExist = await foodPartnerModel.findOne({
        email
    })

    if (isAccountExist) {
        return res.status(400).json({
            message: 'Food Partner already exists'
        });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password: hashpassword,
        phone,
        address,
        contactName,
    })

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET);

    res.cookie('token', token, { 
        httpOnly: false, 
        maxAge: 24 * 60 * 60 * 1000 
    }); 

    res.status(201).json({
        message: 'Food Partner registered successfully',
        foodPartner: { 
            _id: foodPartner._id,
            name: foodPartner.name,
            email: foodPartner.email,
            address: foodPartner.address,
            phone: foodPartner.phone,
            contactName: foodPartner.contactName,
        },
    });


}

async function loginFoodPartner(req, res) {
    const { email, password } = req.body;

    const foodPartner = await foodPartnerModel.findOne({ email });

    if (!foodPartner) {
        return res.status(400).json({
            message: 'Invalid email or password'
        });
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: 'Invalid email or password'
        });
    }
    
    // Add these lines:
    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET);

    res.cookie('token', token, { 
        httpOnly: false, 
        maxAge: 24 * 60 * 60 * 1000 
    });

    res.status(200).json({
        message: 'Food Partner logged in successfully',
        foodPartner: {
            _id: foodPartner._id,
            name: foodPartner.name,
            email: foodPartner.email,
        }
    });
} 

function logoutFoodPartner(req, res) {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Food Partner logged out successfully'
    });
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registrerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
}