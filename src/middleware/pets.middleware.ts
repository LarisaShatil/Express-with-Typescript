import type { Request, Response, NextFunction } from "express"

export const validateNumericId= (
  req: Request<{id:string}>,
  res: Response<{message:string}>,
  next:NextFunction
) => {
  const { id } = req.params
  
  if (!Number.isInteger(Number(id))) {
    res.status(400).json({ message: 'Pet ID must be a number' });
  }
    next();
}

export const isAuthorised = (
  req: Request<{}, unknown, {}, {password?:string}>,
  res: Response<{message:string}>,
  next:NextFunction
) => {
  const { password } = req.query;
  
  if (password !== 'please') {
    res.status(401).json({message:'A wrong password'})
  }
  next()
}