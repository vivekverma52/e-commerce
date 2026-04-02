import React , { createContext , useContext, useReducer, useEffect} from 'react' ;
import { CartItem, CartContextType, Product } from '../types/index';

type CartAction =
    | { type: 'ADD_TO_CART'; payload: Product}
    | { type: 'REMOVE_FROM_CART'; payload: number}
    | { type: 'LOAD_CART'; payload: CartItem[] }
    | { type: 'CLEAR_CART' };

    function CartReducer ( state: CartItem[], action: CartAction): CartItem[]{
        switch(action.type){
            case 'ADD_TO_CART': {
                const existingItem = state.find(item => item.product.id === action.payload.id);
                if(existingItem){
                    return state.map(item =>
                        item.product.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1}
                        : item
                    );
                }
                return [...state, { product: action.payload, quantity: 1}];
            }
            case 'REMOVE_FROM_CART' :
                return state.filter(item => item.product.id !== action.payload);
            case 'LOAD_CART' :
                return action.payload;
            case 'CLEAR_CART':
                return [];
            default:
                return state;
        }
    }


    const CartContext = createContext<CartContextType | undefined>(undefined);

    export const CartProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {
        const [cartItems, dispatch] = useReducer(CartReducer, [], () => {
            try {
                const storedData = localStorage.getItem('cart');
                return storedData ? JSON.parse(storedData) as CartItem[] : [];
            } catch {
                return [];
            }
        });

        useEffect(() => {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }, [cartItems]);

        const addToCart = (product: Product) =>
            dispatch ({ type: 'ADD_TO_CART', payload: product });

        const removeFromCart = (productId: number) =>
            dispatch ({ type: 'REMOVE_FROM_CART', payload: productId });

        const clearCart = () =>
            dispatch({ type: 'CLEAR_CART' });

        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

        return (
            <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
                {children}
            </CartContext.Provider>
        );
    };

        export const useCart = (): CartContextType => {
            const context = useContext(CartContext);
            if (!context) {
                throw new Error('useCart must be used within a CartProvider');
            }
            return context;

    };
