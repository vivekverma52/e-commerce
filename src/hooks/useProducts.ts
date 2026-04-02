import { useState, useEffect } from "react";
import { Product } from "../types";

const BaseURL = "https://api.escuelajs.co/api/v1";

function parseImages(images: string[]): string[] {
    return images.map(img => {
        try {
            const parsed = JSON.parse(img);
            return Array.isArray(parsed) ? parsed[0] : parsed;
        } catch {
            return img;
        }
    }).filter(Boolean);
}

export const useProducts = (
    category: string,
    sort: string,
    search: string
) => {
    const [products, setProducts] = useState<Product[]>([]);
    const[loading, setLoading] = useState<boolean>(false);
    const[error, setError] = useState<string | null>(null);

    useEffect(() => {

        const controller = new AbortController();

        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${BaseURL}/products`, {signal: controller.signal});

                if(!response.ok){
                    throw new Error(`Failed to fetch products`);
                }

                let data: Product[] = await response.json();

                if(category && category !== 'all'){
                    data = data.filter((p) => p.category.name === category);
                }

                if(search){
                    const searchLower = search.toLowerCase();
                    data = data.filter((p) => p.title.toLowerCase().includes(searchLower)
                    || p.description.toLowerCase().includes(searchLower));

                }

                if(sort){
                    const sorted = [...data];
                    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
                    else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
                    else if (sort === 'name') sorted.sort((a,b) => a.title.localeCompare(b.title));
                    data = sorted;
                }
                setProducts(data.map(p => ({ ...p, images: parseImages(p.images) })));
            } catch (err: any){
                if (err.name !== 'AbortError') {
                    setError(err.message || 'An error occurred while fetching products');
            }
                 } finally {
                    setLoading(false);
                 }
            };
            
        fetchProducts();

        return () => controller.abort(); 
        },[category, sort, search]);

    return { products, loading, error };
};


export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${BaseURL}/categories`)
      .then(r => {
        if (!r.ok) throw new Error('Failed to fetch categories');
        return r.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data.map((c: any) => (typeof c === 'string' ? c : c.name)));
        }
      })
      .catch(() => {});
  }, []);

  return categories;
};

export const useProduct = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${BaseURL}/products/${id}`)
      .then(r => {
        if (!r.ok) throw new Error('Product not found');
        return r.json();
      })
      .then(p => setProduct({ ...p, images: parseImages(p.images) }))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading, error };
};
