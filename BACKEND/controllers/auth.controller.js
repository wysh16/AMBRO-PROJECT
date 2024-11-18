// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const crypto = require('crypto');

// // Controller: Đăng ký người dùng
// async function registerUser(req, res) {
//   const { name, email, password } = req.body;
  
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//       isAdmin: false,  // Giả sử là không phải admin mặc định
//     });
    
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error registering user', error });
//   }
// }

// // Controller: Đăng nhập người dùng
// async function loginUser(req, res) {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     const token = jwt.sign(
//       { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
//       'secret', 
//       { expiresIn: '1h' }
//     );

//     res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
//   } catch (error) {
//     res.status(500).json({ error: 'Error during login', error });
//   }
// }

// // Controller: Xử lý thay đổi mật khẩu
// async function resetPassword(req, res) {
//   const { token, newPassword } = req.body;

//   try {
//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: Date.now() },  // Kiểm tra token chưa hết hạn
//     });

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid or expired reset token' });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Cập nhật mật khẩu mới và xóa token
//     user.password = hashedPassword;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;

//     await user.save();
//     res.json({ message: 'Password has been successfully reset' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error resetting password', error });
//   }
// }

// module.exports = {
//   registerUser,
//   loginUser,
//   resetPassword,
// };
