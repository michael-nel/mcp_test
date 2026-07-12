import { homePresentationModel } from "../models/presentation.model.js";
import { HomePresentationData } from "../types/index.js";

export const getHomePresentation = (): HomePresentationData => {
  return homePresentationModel;
};
