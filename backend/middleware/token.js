import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function token(req,res,next){
  let tokenstr = req.headers.authorization;
  if(!tokenstr){
    console.log("No token provided");
    return res.status(401).json({message:"token not provided"});
  }
  if(tokenstr.startsWith("Bearer ")){
    tokenstr = tokenstr.slice(7);
  }
  try{
    const decoded = jwt.verify(tokenstr,process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.log("Invalid token");
    return res.status(401).json({message:"Invalid token"});
  }
}