import jwt from "jsonwebtoken";

export const authAnnouncementMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "Announcements", (err, varifiedJwt) => {
      if (err) {
        return res
          .status(500)
          .json({
            tokenExpired: true,
            message: err.message,
            successful: false,
          });
      } else {
        next();
      }
    });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "User Not Authorized.", successful: false });
  }
};
