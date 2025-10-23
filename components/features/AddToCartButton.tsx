"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";
import type { Product, ProductVariant } from "@/types";

interface AddToCartButtonProps {
  product: Product;
  variant?: ProductVariant;
  quantity?: number;
  className?: string;
  size?: "sm" | "default" | "lg";
  showIcon?: boolean;
}

export function AddToCartButton({
  product,
  variant,
  quantity = 1,
  className,
  size = "default",
  showIcon = true,
}: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, quantity, variant);
    setIsAdded(true);

    // Reset the success state after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <Button
      onClick={handleAddToCart}
      className={className}
      size={size}
      disabled={isAdded}
    >
      <span className="flex items-center">
        {isAdded ? (
          <>
            <Check className={showIcon ? "mr-2 h-4 w-4" : "h-4 w-4"} />
            {showIcon && <span>Added!</span>}
          </>
        ) : (
          <>
            <ShoppingCart className={showIcon ? "mr-2 h-4 w-4" : "h-4 w-4"} />
            {showIcon && <span>Add to Cart</span>}
          </>
        )}
      </span>
    </Button>
  );
}

