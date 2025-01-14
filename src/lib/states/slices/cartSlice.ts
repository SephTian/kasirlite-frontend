import { MenuCart } from '@/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type cartState = {
  cart: MenuCart[];
  totalPrice: number;
  selectedMenu: (MenuCart & { menuIndex: number | null }) | null;
};

const initialState: cartState = {
  cart: [],
  totalPrice: 0,
  selectedMenu: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setSelectedMenu: (state, action: PayloadAction<typeof state.selectedMenu>) => {
      state.selectedMenu = action.payload;
    },
    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload;
    },
    addCartItem: (state, action: PayloadAction<MenuCart>) => {
      let isInCart = false;
      const currentCart = state.cart.map((item) => {
        // Checking if item in cart, so the quantity will be incremented
        if (item.menu.id === action.payload.menu.id) {
          isInCart = true;
          return { menu: { ...item.menu, price: action.payload.menu.price }, quantity: item.quantity + action.payload.quantity };
        }
        return item;
      });

      // If item not in cart then we add new item
      if (!isInCart) {
        state.cart = [...state.cart, { menu: action.payload.menu, quantity: action.payload.quantity }];
        return;
      }

      state.cart = currentCart;
    },
    updateCartItem: (state, action: PayloadAction<{ index: number; quantity: number }>) => {
      state.cart = state.cart.map((item, index) => {
        if (index === action.payload.index) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
    },
    deleteCartItem: (state, action: PayloadAction<{ index: number }>) => {
      state.cart = state.cart.filter((item, index) => index !== action.payload.index);
    },
    unsetCart: (state) => {
      state.cart = [];
    },
  },
});

const cartReducer = cartSlice.reducer;
export default cartReducer;

export const { deleteCartItem, setTotalPrice, updateCartItem, addCartItem, setSelectedMenu } = cartSlice.actions;
