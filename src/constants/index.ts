import { Duration } from "@/types/tasks";

interface ICategoryMap {
  [key: number | string]: {
    label: string;
    color: string;
  };
}

export const CategoryAttributes: ICategoryMap = {
  All: {
    label: "All",
    color: "#E51FE5",
  },
  [Duration.Short]: {
    label: "Short",
    color: "#2431E3",
  },
  [Duration.Medium]: {
    label: "Medium",
    color: "#24AAE3",
  },
  [Duration.Long]: {
    label: "Long",
    color: "#921CE6",
  },
};
