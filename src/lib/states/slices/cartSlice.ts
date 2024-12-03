import { menu, menuCart } from '@/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type cartState = {
  cart: menuCart[];
  selectedMenu: menuCart | null;
};

const initialState: cartState = {
  cart: [],
  selectedMenu: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<Omit<menu, 'isAdditional' | 'disabled'>>) => {
      let isInCart = false;
      const currentCart = state.cart.map((item) => {
        // Checking if item in cart, so the quantity will be incremented
        if (item.menu.id === action.payload.id) {
          isInCart = true;
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      // If item not in cart then we add new item
      if (!isInCart) {
        const object: menuCart = {
          menu: action.payload,
          quantity: 1,
          additional: [],
        };
        state.cart = [...state.cart, object];
        return;
      }

      state.cart = currentCart;
    },
    unsetCart: (state) => {
      state.cart = [];
    },
    setSelectedMenu: (state, action: PayloadAction<menuCart>) => {
      state.selectedMenu = action.payload;
    },
  },
});

const cartReducer = cartSlice.reducer;
export default cartReducer;

export const { addCartItem, setSelectedMenu } = cartSlice.actions;
