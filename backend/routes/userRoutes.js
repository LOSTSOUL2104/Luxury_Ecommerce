const express = require('express');
const router = express.Router();
const {createUser, loginUser, logoutCurrentUser, getAllUsers,getCurrentUserProfile} = require('../controllers/userController')

router.route('/').post(createUser);
router.post('/login', loginUser)
router.post('/logout', logoutCurrentUser)
router.get('/getAll', getAllUsers);
router.get("getCurrentUser", getCurrentUserProfile)


module.exports = router;
