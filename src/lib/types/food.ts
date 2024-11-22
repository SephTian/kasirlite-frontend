export type food = {
  id: string;
  image: string;
  name: string;
  menuType: string;
  menuTypeId: string;
  isAdditional: boolean;
  price: number;
  discount: number;
};

export type foodCart = {
  food: food;
  quantity: number;
  additional: food[];
};
