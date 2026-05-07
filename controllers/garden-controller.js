const GardenModel = require("../models/garden-model");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

// Shared helpers

const getCookieBase = () => ({
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  path: "/",
});

// Public data endpoints

exports.getAllIdeas = async (req, res) => {
  try {
    const data = await GardenModel.getAllIdeas();
    res.json(data);
  } catch (err) {
    console.error("Failed to fetch ideas:", err);
    res.status(500).json({ success: false, message: "Could not load ideas." });
  }
};

exports.getAllKnowledges = async (req, res) => {
  try {
    const data = await GardenModel.getAllKnowledges();
    res.json(data);
  } catch (err) {
    console.error("Failed to fetch knowledges:", err);
    res
      .status(500)
      .json({ success: false, message: "Could not load knowledges." });
  }
};

exports.getAllPlants = async (req, res) => {
  try {
    const data = await GardenModel.getAllPlants();
    res.json(data);
  } catch (err) {
    console.error("Failed to fetch plants:", err);
    res.status(500).json({ success: false, message: "Could not load plants." });
  }
};

// Authenticated endpoints

exports.addNewGarden = async (req, res) => {
  try {
    const garden = req.body;
    if (!garden.garden_name || !garden.garden_content) {
      return res.status(400).json({
        success: false,
        message: "Garden name and content are required.",
      });
    }

    garden.user_id = req.user.id;
    const result = await GardenModel.createGarden(garden);
    console.log(
      `Garden created: "${garden.garden_name}" by user ${req.user.username}`,
    );
    return res
      .status(201)
      .json({ success: true, message: "Garden created.", id: result.insertId });
  } catch (err) {
    console.error("Failed to create garden:", err);
    res
      .status(500)
      .json({ success: false, message: "Could not create garden." });
  }
};

exports.getMySavedPlants = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await GardenModel.getMySavedPlants(userId);
    res.json(data);
  } catch (err) {
    console.error("Failed to fetch saved plants:", err);
    res
      .status(500)
      .json({ success: false, message: "Could not load saved plants." });
  }
};

exports.savePlant = async (req, res) => {
  try {
    const plant_id = req.body.id;
    const userId = req.user.id;

    if (!plant_id) {
      return res
        .status(400)
        .json({ success: false, message: "Plant ID is required." });
    }

    const result = await GardenModel.savePlant(userId, plant_id);
    console.log(
      `Plant ${plant_id} ${result.action} by user ${req.user.username}`,
    );
    res.json(result);
  } catch (err) {
    console.error("Failed to save plant:", err);
    res.status(500).json({ success: false, message: "Could not save plant." });
  }
};

exports.getMySavedIdeas = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await GardenModel.getMySavedIdeas(userId);
    res.json(data);
  } catch (err) {
    console.error("Failed to fetch saved ideas:", err);
    res
      .status(500)
      .json({ success: false, message: "Could not load saved ideas." });
  }
};

exports.saveIdea = async (req, res) => {
  try {
    const idea_id = req.body.id;
    const userId = req.user.id;

    if (!idea_id) {
      return res
        .status(400)
        .json({ success: false, message: "Idea ID is required." });
    }

    const result = await GardenModel.saveIdea(userId, idea_id);
    console.log(
      `Idea ${idea_id} ${result.action} by user ${req.user.username}`,
    );
    res.json({ success: true, action: result.action, data: result.result });
  } catch (err) {
    console.error("Failed to save idea:", err);
    res.status(500).json({ success: false, message: "Could not toggle idea." });
  }
};

exports.getMyGardens = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await GardenModel.getGardensByUserId(userId);
    res.json(data);
  } catch (err) {
    console.error("Failed to fetch gardens:", err);
    res
      .status(500)
      .json({ success: false, message: "Could not load your gardens." });
  }
};

exports.getGardenById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const data = await GardenModel.getGardenById(id, userId);

    if (!data || !Array.isArray(data) || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Garden not found or access denied.",
      });
    }

    res.json(data[0]);
  } catch (err) {
    console.error("Failed to fetch garden:", err);
    res
      .status(500)
      .json({ success: false, message: "Could not load garden details." });
  }
};

exports.deleteGarden = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    await GardenModel.deleteGarden(id, userId);
    console.log(`Garden ${id} deleted by user ${req.user.username}`);
    return res.status(204).send();
  } catch (err) {
    console.error("Failed to delete garden:", err);
    res
      .status(500)
      .json({ success: false, message: "Could not delete garden." });
  }
};

exports.updateGarden = async (req, res) => {
  try {
    const garden = req.body;
    const userId = req.user.id;

    if (!garden.id || !garden.name || !garden.content) {
      return res.status(400).json({
        success: false,
        message: "Garden ID, name, and content are required.",
      });
    }
    const result = await GardenModel.updateGarden(garden, userId);
    console.log(`Garden ${garden.id} updated by user ${req.user.username}`);
    res.json({ success: true, message: "Garden updated.", data: result });
  } catch (err) {
    console.error("Failed to update garden:", err);
    res
      .status(500)
      .json({ success: false, message: "Could not update garden." });
  }
};

// Profile update endpoints

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { newUsername, currentPassword, newPassword } = req.body;

    // --- Username update ---
    if (newUsername) {
      if (newUsername.length > 20 || newUsername.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Username must be between 6 and 20 characters.",
        });
      }

      const currentUser = await GardenModel.getUserById(userId);
      if (!currentUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found." });
      }

      if (currentUser.username === newUsername) {
        return res.status(400).json({
          success: false,
          message: "New username cannot be the same as your current username.",
        });
      }

      await GardenModel.updateUsername(userId, newUsername);

      const cookieBase = getCookieBase();
      res.cookie(
        "user",
        JSON.stringify({ id: userId, username: newUsername }),
        {
          ...cookieBase,
          httpOnly: false,
          maxAge: 60 * 60 * 1000,
        },
      );

      const accessToken = jwt.sign(
        { id: userId, username: newUsername },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "15m", algorithm: "HS256" },
      );
      res.cookie("accessToken", accessToken, {
        ...cookieBase,
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      });

      console.log(`User ${userId} changed username to "${newUsername}"`);
      return res.json({
        success: true,
        message: "Username updated successfully.",
        newUsername,
      });
    }

    // --- Password update ---
    if (currentPassword && newPassword) {
      if (newPassword.length > 32 || newPassword.length < 8) {
        return res.status(400).json({
          success: false,
          message: "New password must be between 8 and 32 characters.",
        });
      }

      const currentUser = await GardenModel.getUserById(userId);
      if (!currentUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found." });
      }

      const passwordOk = await argon2.verify(
        currentUser.password,
        currentPassword,
      );
      if (!passwordOk) {
        return res
          .status(401)
          .json({ success: false, message: "Current password is incorrect." });
      }

      const sameAsOld = await argon2.verify(currentUser.password, newPassword);
      if (sameAsOld) {
        return res.status(400).json({
          success: false,
          message: "New password cannot be the same as your current password.",
        });
      }

      const newHash = await argon2.hash(newPassword);
      await GardenModel.updatePassword(userId, newHash);

      console.log(
        `User ${userId} (${req.user.username}) changed their password`,
      );
      return res.json({
        success: true,
        message: "Password updated successfully.",
      });
    }

    // --- Nothing valid sent ---
    return res
      .status(400)
      .json({ success: false, message: "No valid fields provided." });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ success: false, message: "This username is already taken." });
    }
    console.error("Update profile error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Could not update profile." });
  }
};

// Authentication endpoints

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    if (username.length > 20 || username.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Username must be less than 20 characters and more than 6 characters .",
      });
    }

    if (password.length > 32 || password.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be less than 32 characters and more than 8 characters.",
      });
    }

    const passwordHash = await argon2.hash(password);
    await GardenModel.createUser(username, passwordHash);

    console.log(`New user registered: ${username}`);
    return res
      .status(201)
      .json({ success: true, message: "Account created successfully." });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ success: false, message: "This username is already taken." });
    }
    console.error("Registration error:", err);
    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password, rememberMe } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    if (username.length > 50 || password.length > 128) {
      return res
        .status(400)
        .json({ success: false, message: "Input too long." });
    }

    const rows = await GardenModel.getUserByUsername(username);
    if (rows.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password." });
    }

    const user = rows[0];
    const passwordOk = await argon2.verify(user.password, password);
    if (!passwordOk) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password." });
    }

    // If rememberMe -> refresh lasts 30 days, user cookie lasts 30 days
    // If not -> refresh lasts 24h, user cookie lasts 1h
    const remember = rememberMe === true || rememberMe === "true";
    const refreshMaxAge = remember
      ? 30 * 24 * 60 * 60 * 1000
      : 24 * 60 * 60 * 1000;
    const userCookieMaxAge = remember
      ? 30 * 24 * 60 * 60 * 1000
      : 60 * 60 * 1000;
    const refreshExpiry = remember ? "30d" : "24h";

    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m", algorithm: "HS256" },
    );

    const refreshToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: refreshExpiry, algorithm: "HS256" },
    );

    const refreshTokenHash = await argon2.hash(refreshToken);
    await GardenModel.storeRefreshToken(user.id, refreshTokenHash);

    const cookieBase = getCookieBase();

    res.cookie("accessToken", accessToken, {
      ...cookieBase,
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      ...cookieBase,
      httpOnly: true,
      maxAge: refreshMaxAge,
    });

    res.cookie(
      "user",
      JSON.stringify({ id: user.id, username: user.username }),
      {
        ...cookieBase,
        httpOnly: false,
        maxAge: userCookieMaxAge,
      },
    );

    console.log(`User logged in: ${username} (rememberMe: ${remember})`);
    return res
      .status(200)
      .json({ success: true, message: "Login successful." });
  } catch (err) {
    console.error("Login error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Login failed. Please try again." });
  }
};

exports.logout = async (req, res) => {
  try {
    const cookieBase = getCookieBase();

    res.clearCookie("accessToken", { ...cookieBase, httpOnly: true });
    res.clearCookie("refreshToken", { ...cookieBase, httpOnly: true });
    res.clearCookie("user", { ...cookieBase, httpOnly: false });

    const token = req.cookies.refreshToken;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET, {
          algorithms: ["HS256"],
        });
        await GardenModel.deleteRefreshTokens(decoded.id);
      } catch (e) {
        // token was already invalid -> just clear cookies
      }
    }

    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully." });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ success: false, message: "Logout failed." });
  }
};

exports.refresh = async (req, res) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token." });
    }

    const decoded = jwt.verify(
      refreshTokenCookie,
      process.env.JWT_REFRESH_SECRET,
      { algorithms: ["HS256"] },
    );

    const stored = await GardenModel.getLatestRefreshToken(decoded.id);
    if (
      !stored ||
      !(await argon2.verify(stored.token_hash, refreshTokenCookie))
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token." });
    }

    const accessToken = jwt.sign(
      { id: decoded.id, username: decoded.username },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "60m", algorithm: "HS256" },
    );

    const newRefreshToken = jwt.sign(
      { id: decoded.id, username: decoded.username },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "24h", algorithm: "HS256" },
    );

    const newRefreshTokenHash = await argon2.hash(newRefreshToken);
    await GardenModel.storeRefreshToken(decoded.id, newRefreshTokenHash);

    const cookieBase = getCookieBase();

    res.cookie("accessToken", accessToken, {
      ...cookieBase,
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", newRefreshToken, {
      ...cookieBase,
      httpOnly: true,
      maxAge: 86400000,
    });

    res.cookie(
      "user",
      JSON.stringify({ id: decoded.id, username: decoded.username }),
      {
        ...cookieBase,
        httpOnly: false,
        maxAge: 15 * 60 * 1000,
      },
    );

    return res
      .status(200)
      .json({ success: true, message: "Token refreshed successfully." });
  } catch (err) {
    console.error("Refresh error:", err);
    return res.status(401).json({ success: false, message: "Invalid token." });
  }
};

// --- Delete account ---

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    await GardenModel.deleteUser(userId);

    const cookieBase = getCookieBase();
    res.clearCookie("accessToken", { ...cookieBase, httpOnly: true });
    res.clearCookie("refreshToken", { ...cookieBase, httpOnly: true });
    res.clearCookie("user", { ...cookieBase, httpOnly: false });

    console.log(`User ${userId} (${req.user.username}) deleted their account`);
    return res.status(204).send();
  } catch (err) {
    console.error("Delete account error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Could not delete account." });
  }
};
