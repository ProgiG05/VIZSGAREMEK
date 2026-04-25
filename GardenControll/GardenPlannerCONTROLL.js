const GardenModel = require('../GardenModell/GardenPlannerMODELL');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

// Public data endpoints

exports.GetEveryIdea = async (req, res) => {
    try {
        const data = await GardenModel.GetAllIdeas();
        res.json(data);
    } catch (err) {
        console.error('Failed to fetch ideas:', err.message);
        res.status(500).json({ success: false, message: 'Could not load ideas.' });
    }
};

exports.GetAllKnowledges = async (req, res) => {
    try {
        const data = await GardenModel.GetAllKnowledges();
        res.json(data);
    } catch (err) {
        console.error('Failed to fetch knowledges:', err.message);
        res.status(500).json({ success: false, message: 'Could not load knowledges.' });
    }
};

exports.GetAllPlants = async (req, res) => {
    try {
        const data = await GardenModel.GetAllPlants();
        res.json(data);
    } catch (err) {
        console.error('Failed to fetch plants:', err.message);
        res.status(500).json({ success: false, message: 'Could not load plants.' });
    }
};

exports.GetSearchedPlantDetails = async (req, res) => {
    try {
        const { commonName, botanicalName, origin, type, water, sunlight, soil, indoor, seeds, planting, pruning, harvesting } = req.query;
        const data = await GardenModel.GetSearchedPlantDetails(commonName, botanicalName, origin, type, water, sunlight, soil, indoor, seeds, planting, pruning, harvesting);
        res.json(data);
    } catch (err) {
        console.error('Plant search failed:', err.message);
        res.status(500).json({ success: false, message: 'Plant search failed.' });
    }
};

exports.GetAllWorksAndTools = async (req, res) => {
    try {
        const data = await GardenModel.GetAllWorksAndTools();
        res.json(data);
    } catch (err) {
        console.error('Failed to fetch works and tools:', err.message);
        res.status(500).json({ success: false, message: 'Could not load works and tools.' });
    }
};

// Authenticated endpoints

exports.AddNewgarden = async (req, res) => {
    try {
        const garden = req.body;
        if (!garden.garden_name || !garden.garden_content) {
            return res.status(400).json({ success: false, message: 'Garden name and content are required.' });
        }
        
        garden.user_id = req.user.id;
        const result = await GardenModel.AddNewgarden(garden);
        console.log(`Garden created: "${garden.garden_name}" by user ${req.user.username}`);
        res.json(result);
    } catch (err) {
        console.error('Failed to create garden:', err.message);
        res.status(500).json({ success: false, message: 'Could not create garden.' });
    }
};

exports.GetMySavedPlants = async (req, res) => {
    try {
        const userId = req.user.id;
        const data = await GardenModel.GetMySavedPlants(userId);
        res.json(data);
    } catch (err) {
        console.error('Failed to fetch saved plants:', err.message);
        res.status(500).json({ success: false, message: 'Could not load saved plants.' });
    }
};

exports.SavePlant = async (req, res) => {
    try {
        const { plant_id } = req.body;
        const userId = req.user.id;

        if (!plant_id) {
            return res.status(400).json({ success: false, message: 'Plant ID is required.' });
        }

        const result = await GardenModel.SavePlant(userId, plant_id);
        console.log(`Plant ${plant_id} saved by user ${req.user.username}`);
        res.json(result);
    } catch (err) {
        console.error('Failed to save plant:', err.message);
        res.status(500).json({ success: false, message: 'Could not save plant.' });
    }
};

exports.GetMyGardens = async (req, res) => {
    try {
        const userId = req.user.id;
        const data = await GardenModel.GetGardensByUserId(userId);
        res.json(data);
    } catch (err) {
        console.error('Failed to fetch gardens:', err.message);
        res.status(500).json({ success: false, message: 'Could not load your gardens.' });
    }
};

exports.GetGardenById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const data = await GardenModel.GetGardenById(id, userId);
        
        if (!data || !Array.isArray(data) || data.length === 0) {
            return res.status(404).json({ success: false, message: 'Garden not found or access denied.' });
        }
        
        res.json(data[0]);
    } catch (err) {
        console.error('Failed to fetch garden:', err.message);
        res.status(500).json({ success: false, message: 'Could not load garden details.' });
    }
};

exports.DeleteGarden = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const result = await GardenModel.DeleteGarden(id, userId);
        console.log(`Garden ${id} deleted by user ${req.user.username}`);
        res.json({ success: true, message: 'Garden deleted.', data: result });
    } catch (err) {
        console.error('Failed to delete garden:', err.message);
        res.status(500).json({ success: false, message: 'Could not delete garden.' });
    }
};

exports.UpdateGarden = async (req, res) => {
    try {
        const garden = req.body;
        const userId = req.user.id;

        if (!garden.id || !garden.name || !garden.content) {
            return res.status(400).json({ success: false, message: 'Garden ID, name, and content are required.' });
        }
        const result = await GardenModel.UpdateGarden(garden, userId);
        console.log(`Garden ${garden.id} updated by user ${req.user.username}`);
        res.json({ success: true, message: 'Garden updated.', data: result });
    } catch (err) {
        console.error('Failed to update garden:', err.message);
        res.status(500).json({ success: false, message: 'Could not update garden.' });
    }
};

// Authentication endpoints

exports.Register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Username and password are required.' });
        }

        const passwordHash = await argon2.hash(password);
        await GardenModel.CreateUser(username, passwordHash);

        console.log(`New user registered: ${username}`);
        return res.status(201).json({ success: true, message: 'Account created successfully.' });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ success: false, message: 'This username is already taken.' });
        }
        console.error('Registration error:', err.message);
        return res.status(500).json({ success: false, message: 'Registration failed. Please try again.' });
    }
};

exports.Login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Username and password are required.' });
        }

        const rows = await GardenModel.GetUserByUsername(username);
        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid username or password.' });
        }

        const user = rows[0];
        const passwordOk = await argon2.verify(user.password, password);
        if (!passwordOk) {
            return res.status(401).json({ success: false, message: 'Invalid username or password.' });
        }

        const accessToken = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h', algorithm: 'HS256' }
        );

        const refreshToken = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h', algorithm: 'HS256' }
        );

        const secureCookie = process.env.NODE_ENV === 'production';
        const cookieBase = { secure: secureCookie, sameSite: 'Strict', path: '/' };

        res.cookie('accessToken', accessToken, {
            ...cookieBase,
            httpOnly: true,
            maxAge: 3600000 // 1 hour
        });

        res.cookie('refreshToken', refreshToken, {
            ...cookieBase,
            httpOnly: true,
            maxAge: 86400000 // 24 hours
        });

        res.cookie('user', JSON.stringify({ id: user.id, username: user.username }), {
            ...cookieBase,
            httpOnly: false,
            maxAge: 3600000 // 1 hour — matches accessToken
        });

        console.log(`User logged in: ${username}`);
        return res.status(200).json({
            success: true,
            message: 'Login successful.'
        });
    } catch (err) {
        console.error('Login error:', err.message);
        return res.status(500).json({ success: false, message: 'Login failed. Please try again.' });
    }
};

exports.Logout = async (req, res) => {
    try {
        const secureCookie = process.env.NODE_ENV === 'production';
        const cookieBase = { secure: secureCookie, sameSite: 'Strict', path: '/' };
        
        res.clearCookie('accessToken', { ...cookieBase, httpOnly: true });
        res.clearCookie('refreshToken', { ...cookieBase, httpOnly: true });
        res.clearCookie('user', { ...cookieBase, httpOnly: false });
        
        return res.status(200).json({ success: true, message: 'Logged out successfully.' });
    } catch(err) {
        console.error('Logout error:', err.message);
        return res.status(500).json({ success: false, message: 'Logout failed.' });
    }
};

exports.Refresh = async (req, res) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
        if (!refreshTokenCookie) {
            return res.status(401).json({ success: false, message: 'Invalid token.' });
        }

        const decoded = jwt.verify(refreshTokenCookie, process.env.JWT_SECRET, { algorithms: ['HS256'] });

        const accessToken = jwt.sign(
            { id: decoded.id, username: decoded.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h', algorithm: 'HS256' }
        );

        const newRefreshToken = jwt.sign(
            { id: decoded.id, username: decoded.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h', algorithm: 'HS256' }
        );

        const secureCookie = process.env.NODE_ENV === 'production';
        const cookieBase = { secure: secureCookie, sameSite: 'Strict', path: '/' };

        res.cookie('accessToken', accessToken, {
            ...cookieBase,
            httpOnly: true,
            maxAge: 3600000 // 1 hour
        });

        res.cookie('refreshToken', newRefreshToken, {
            ...cookieBase,
            httpOnly: true,
            maxAge: 86400000 // 24 hours
        });
        
        res.cookie('user', JSON.stringify({ id: decoded.id, username: decoded.username }), {
            ...cookieBase,
            httpOnly: false,
            maxAge: 3600000 // 1 hour — matches accessToken
        });

        return res.status(200).json({ success: true, message: 'Token refreshed successfully.' });
    } catch(err) {
        console.error('Refresh error:', err.message);
        return res.status(401).json({ success: false, message: 'Invalid token.' });
    }
};