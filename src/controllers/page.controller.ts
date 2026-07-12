import { Request, Response } from "express";
import { getHomePresentation } from "../services/presentation.service.js";
import { IndexViewData } from "../types/index.js";

export const renderIndexPage = (_req: Request, res: Response): void => {
  const presentation = getHomePresentation();
  const viewData: IndexViewData = {
    title: "Projeto Base Node.js + TypeScript + Express + EJS",
    message: presentation.message,
  };

  res.render("index", viewData);
};
