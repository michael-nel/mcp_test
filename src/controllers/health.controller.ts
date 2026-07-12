import { Request, Response } from "express";

export const healthCheck = (_req: Request, res: Response): void => {
  res.json({ ok: true });
};
