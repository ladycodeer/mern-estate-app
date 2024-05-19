
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

// Signup controller
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    // Hash the password asynchronously
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    next(error);
  }
};

// Signin controller
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));

    // Compare passwords asynchronously
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    // Generate JWT
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Exclude password from user object
    const { password: pass, ...rest } = validUser._doc;

    // Set cookie and send response
    res
      .cookie('access_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// import User from '../models/user.model.js';
// import bcrypt from 'bcrypt';
// import { errorHandler } from '../utils/error.js';
// import jwt from 'jsonwebtoken';

// export const signup = async (req, res,next) => {

//   const { username, email, password } = req.body;
//   const hashedPassword = bcrypt.hashSync(password, 10);
//   const newUser = new User({ username, email, password: hashedPassword });
//   try {
//       await newUser.save();
//       res.status(201).json('User created successfully!');

//   } catch (error) {
//     next(error);
//   }
// };

// export const signin = async (req, res, next) => {
//   const { email, password } = req.body;
//     try {
//       const validUser = await User.findOne({ email });
//       if (!validUser) return next(errorHandler(404, 'User not found!'));
//       const validPassword = bcrypt.compareSync(password, validUser.password);
//       if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
//       const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
//       const { password: pass, ...rest } = validUser._doc;
//       res
//         .cookie('access_token', token, { httpOnly: true })
//         .status(200)
//         .json(rest);
//     } catch (error) {
//       next(error);
//     }
//   }
