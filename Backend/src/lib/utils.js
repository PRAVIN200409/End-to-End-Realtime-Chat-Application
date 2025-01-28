import jwt from "jsonwebtoken";
export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return res.cookie("jwt", token, {
        httpOnly: true, //prevent cookie from being accessed through client side script
        secure: process.env.NODE_ENV !== "development", //cookie will only be sent on secure connections
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict", //cookie will only be sent in a first-party context
    });
}