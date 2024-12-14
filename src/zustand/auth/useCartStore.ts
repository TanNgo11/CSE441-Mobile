import create from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CartItem = {
  id: number;
  quantity: number;
};
export interface Coupon {
  code: string;
  discount: number;
  expiryDate: Date;
}

type ShoppingCartState = {
  cartItems: CartItem[];
  coupon: Coupon | null;
  cartQuantity: number;
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  putItemInCartWithQuantity: (id: number, quantity: number) => void;
  removeItemFromCart: (id: number) => void;
  doSetCoupon: (coupon: Coupon) => void;
  clearCart: () => void;
};

export const useShoppingCartStore = create<ShoppingCartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      coupon: null,
      cartQuantity: 0,

      getItemQuantity: (id: number) => {
        const item = get().cartItems.find((item) => item.id === id);
        return item ? item.quantity : 0;
      },

      increaseItemQuantity: (id: number) => {
        set((state) => {
          const itemIndex = state.cartItems.findIndex((item) => item.id === id);
          if (itemIndex >= 0) {
            const updatedItems = [...state.cartItems];
            updatedItems[itemIndex].quantity += 1;
            return {
              cartItems: updatedItems,
              cartQuantity: updatedItems.reduce(
                (total, item) => total + item.quantity,
                0,
              ),
            };
          }
          const newItems = [...state.cartItems, { id, quantity: 1 }];
          return {
            cartItems: newItems,
            cartQuantity: newItems.reduce(
              (total, item) => total + item.quantity,
              0,
            ),
          };
        });
      },

      decreaseItemQuantity: (id: number) => {
        set((state) => {
          const itemIndex = state.cartItems.findIndex((item) => item.id === id);
          if (itemIndex >= 0) {
            const updatedItems = [...state.cartItems];
            if (updatedItems[itemIndex].quantity > 1) {
              updatedItems[itemIndex].quantity -= 1;
              return {
                cartItems: updatedItems,
                cartQuantity: updatedItems.reduce(
                  (total, item) => total + item.quantity,
                  0,
                ),
              };
            }
            return {
              cartItems: updatedItems.filter((item) => item.id !== id),
              cartQuantity: updatedItems
                .filter((item) => item.id !== id)
                .reduce((total, item) => total + item.quantity, 0),
            };
          }
          return state;
        });
      },

      putItemInCartWithQuantity: (id: number, quantity: number) => {
        set((state) => {
          const itemIndex = state.cartItems.findIndex((item) => item.id === id);
          if (itemIndex >= 0) {
            const updatedItems = [...state.cartItems];
            updatedItems[itemIndex].quantity += quantity;
            return {
              cartItems: updatedItems,
              cartQuantity: updatedItems.reduce(
                (total, item) => total + item.quantity,
                0,
              ),
            };
          }
          const newItems = [...state.cartItems, { id, quantity }];
          return {
            cartItems: newItems,
            cartQuantity: newItems.reduce(
              (total, item) => total + item.quantity,
              0,
            ),
          };
        });
      },

      removeItemFromCart: (id: number) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
          cartQuantity: state.cartItems
            .filter((item) => item.id !== id)
            .reduce((total, item) => total + item.quantity, 0),
        }));
      },

      doSetCoupon: (coupon: any) => {
        set({ coupon });
      },

      clearCart: () => {
        set({
          cartItems: [],
          cartQuantity: 0,
        });
      },
    }),
    {
      name: "shopping-cart",
      getStorage: () => AsyncStorage,
    },
  ),
);
