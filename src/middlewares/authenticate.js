import JWT from "jsonwebtoken";

import User from "@mongoose/User";
import config from "@config/index";
import _ from "lodash";

const authenticationMiddleware = async (req, res, next) => {
  try {
    if(_.isEmpty(req.headers.authorization)) {
      req.headers.authorization = `Bearar ${req.query.t}`;
    }
    
    if(_.isEmpty(req.headers.guestkey) && req.query.guestkey) {
      req.headers.guestkey = req.query.guestkey
    }

    if (req.headers.authorization) {
      // This will remove 'Bearer' section
      const jwtToken = req.headers.authorization.split(" ")[1];
      const verifiedToken = JWT.verify(jwtToken, config.jwt.secretKey);
      if (verifiedToken) {
        const decodedToken = JWT.decode(jwtToken, { complete: true });
        const foundUser = await User.findById(decodedToken.payload.userId).populate({ path: 'role_id', select: ['_id', 'title', 'access_panel', 'systematic'] });
        req.user = foundUser;
      } else {
        req.user = null;
      }
    } else {
      req.user = null;
    }
  } catch (error) {
    req.user = null;
  }
  next();
};

export default authenticationMiddleware;
