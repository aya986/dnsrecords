import createError from "http-errors";

const isAuthenticated = (req, res, next) => {
  try {
    if (req.user) {
      //console.log(`req.user`,req.user);
      next();
    } else {
      next(createError(401, "برای دسترسی به این بخش باید در سایت لاگین نمایید"));
    }
  } catch (err) {
    next(createError(401, "برای دسترسی به این بخش باید در سایت لاگین نمایید"));
  }
};

export default isAuthenticated;
