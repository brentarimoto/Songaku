/*************************** REQUIRES ***************************/
const express = require('express');
const { check } = require('express-validator');

const { setTokenCookie, restoreUser, requireAuth  } = require('../../utils/auth');
const { User } = require('../../db/models');

/*************************** ROUTER SETUP ***************************/
const router = express.Router();

/*************************** MIDDLEWARE ***************************/
const asyncHandler = require('express-async-handler');
const { handleValidationErrors } = require('../../utils/validation');

// Login Validation
const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors,
]

/*************************** ROUTES ***************************/
// Get Request for User
router.get('/', restoreUser, (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({user:null});
});

// LOGIN
router.post('/', validateLogin, asyncHandler(async (req, res, next) => {
      const { credential, password } = req.body;

      const user = await User.login({ credential, password });

      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }

      await setTokenCookie(res, user);

      return res.json({
        user,
      });
}),);

// LOG OUT
router.delete('/',(_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
);


/*************************** EXPORTS ***************************/
module.exports = router;