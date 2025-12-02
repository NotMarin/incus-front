"use client";

import { useEffect, useMemo, useState } from "react";
import ProductsTable, { Product } from "./products-table";
import SectionCardsProducts from "./section-cards-products";

function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    try {
      const response = await fetch("http://10.50.50.12:3002/api/productos");
      if (!response.ok) {
        throw new Error("No se pudo cargar el inventario");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data?.productos && Array.isArray(data.productos)) {
        setProducts(data.productos);
      } else if (typeof data === "object" && data !== null && !Array.isArray(data)) {
        const productsArray = Object.values(data).map((item: any) => ({
          ...item,
          _id: item._id,
        }));
        setProducts(productsArray as Product[]);
      } else {
        setProducts([]);
      }
    } catch (error) {
      setProducts([]);
      console.error(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const { totalProducts, totalStock } = useMemo(() => {
    const totalStockValue = products.reduce((total, product) => total + (product.stock ?? 0), 0);
    return {
      totalProducts: products.length,
      totalStock: totalStockValue,
    };
  }, [products]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 md:gap-6">
          <SectionCardsProducts totalProducts={totalProducts} totalStock={totalStock} />
          <div>
            <ProductsTable data={products} onCreated={loadProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsManagement;
