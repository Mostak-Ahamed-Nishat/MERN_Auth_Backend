import jwt from "jsonwebtoken";

const generateJWTToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "777777777d",
  });

  res.cookies("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 3000 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateJWTToken;
