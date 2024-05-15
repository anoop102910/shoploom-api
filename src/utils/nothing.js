
// // @desc    Verify user's email
// // @route   GET /api/auth/verify-email
// // @access  Public
// exports.email = async (req, res) => {
//   const { error } = emailSchema.validate(req.body);
//   if (error) {
//     return sendResponse(res, 400, error.details[0].message);
//   }
//   try {
//     const { email, verificationCode } = req.body;

//     // Find the user by phone number
//     const user = await User.findOne({ where: { email } });

//     // Check if the user exists
//     if (!user) {
//       return sendResponse(res, 404, "User not found");
//     }

//     // Check if the verification code matches
//     if (emailWithOtpMapping[user.email] !== verificationCode) {
//       return sendResponse(res, 400, "Invalid verification code");
//     }

//     await user.update({ isVerified: true });

//     return sendResponse(res, 200, "Phone number verified successfully");
//   } catch (error) {
//     console.error(error);
//     return sendResponse(res, 500, error.message);
//   }
// };

// @desc Send email verification
// const emailVerification = async userId => {
//   const verificationToken = generateToken({ userId });
//   const verificationLink = `${SERVER_URL}/api/auth/verify-email?token=${verificationToken}`;
//   const emailMessage = `
//       <p>Thank you for registering with us!</p>
//       <p>Please verify your email address by clicking the link below:</p>
//       <p><a href="${verificationLink}" target="_blank">${verificationLink}</a></p>
//       <p>If you did not sign up for an account, you can safely ignore this email.</p>
//       <p>Thank you,</p>
//       <p>The EchoSage Team</p>
//   `;

//   email(newUser.email, "email Verification", emailMessage);
// };
