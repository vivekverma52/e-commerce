export interface ProductCategory {
    id: number;
    name: string;
    slug: string;
    image: string;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: ProductCategory;
    images: string[];
}

export interface CartItem {
    product : Product;
    quantity: number;
}

interface ProductCardProps {
  product: Product;
}


export interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

export interface FilterState {
    category: string;
    sort: string;
    search: string;
}
