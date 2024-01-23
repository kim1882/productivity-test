import { Duration } from "@/types/tasks";

interface ICategoryMap {
  [key: number]: string;
}

export const CategoryLabel: ICategoryMap = {
  [Duration.Short]: "Short",
  [Duration.Medium]: "Medium",
  [Duration.Long]: "Long",
};

export const CategoryColor: ICategoryMap = {
  [Duration.Short]: "#2431E3",
  [Duration.Medium]: "#24AAE3",
  [Duration.Long]: "#921CE6",
};
