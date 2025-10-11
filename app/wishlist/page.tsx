"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star, Share2, ShoppingCart, ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import type { Product } from "@/types";

export default function WishlistPage() {
  const { items: wishlistItems, removeItem, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const [copied, setCopied] = useState<string | null>(null);

  const handleRemoveFromWishlist = (productId: string) => {
    removeItem(productId);
  };

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
  };

  const handleShare = async (product: Product) => {
    const productUrl = `${window.location.origin}/products/${product.slug}`;
    
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(product.id);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = productUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(product.id);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />
        );
      } else {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-gray-200 text-gray-200" />
        );
      }
    }
    
    return stars;
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
            <p className="text-gray-600">Save items you love for later</p>
          </div>

          {/* Empty State */}
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">
                Start adding items you love to your wishlist
              </p>
              <Button asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
            <p className="text-gray-600">
              {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={clearWishlist}
              className="text-red-600 hover:bg-red-50 border-red-200"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => {
            const discount = product.comparePrice ? calculateDiscount(product.price, product.comparePrice) : 0;
            
            return (
              <Card key={product.id} className="group relative overflow-hidden hover:shadow-lg transition-all duration-300">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={product.images[0]?.url || ""}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isFeatured && (
                      <Badge variant="primary" className="text-xs">
                        Featured
                      </Badge>
                    )}
                    {discount > 0 && (
                      <Badge variant="error" className="text-xs">
                        -{discount}%
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="w-8 h-8 rounded-full bg-red-500 text-white hover:bg-red-600"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleShare(product)}
                      className="w-8 h-8 rounded-full bg-white/90 text-gray-600 hover:bg-white hover:text-blue-500"
                    >
                      {copied === product.id ? (
                        <Share2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>

                  {/* Stock Status */}
                  {product.stockQuantity === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="secondary" className="text-sm">
                        Out of Stock
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Brand */}
                  {product.brand && (
                    <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
                  )}

                  {/* Product Name */}
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {renderStars(product.rating.average)}
                    </div>
                    <span className="text-sm text-gray-500">
                      ({product.rating.count})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.comparePrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.comparePrice)}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1"
                      disabled={product.stockQuantity === 0}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {product.stockQuantity === 0 ? "Out of Stock" : "Add to Cart"}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="text-red-600 hover:bg-red-50 border-red-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Footer Actions */}
        {wishlistItems.length > 0 && (
          <div className="mt-12 text-center">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Ready to shop?</h3>
              <p className="text-gray-600 mb-4">
                Add all items to your cart or continue browsing
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => {
                    wishlistItems.forEach(product => {
                      if (product.stockQuantity > 0) {
                        addItem(product, 1);
                      }
                    });
                  }}
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add All to Cart
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}