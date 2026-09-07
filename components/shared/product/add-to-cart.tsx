"use client";

import { Cart, CartItem } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { Button } from "@/components/ui/button";
import { Loader, Minus, Plus } from "lucide-react";
import { useTransition } from "react";

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);

      if (!res?.success) {
        toast.add({ type: "error", description: res?.message });
        return;
      }

      // handle success add to cart
      toast.add({
        description: res.message,
        //   actionProps: {
        //     children: "Go to Cart",
        //     onClick() {
        //       router.push("/cart");
        //     },
        //   },
        actionProps: {
          children: (
            <Button className={"bg-primary text-white hover:bg-gray-800"}>
              Go to Cart
            </Button>
          ),
          onClick() {
            router.push("/cart");
          },
        },
      });
    });
  };

  // Handle remove from cart
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      toast.add({
        type: res.success ? "default" : "error",
        description: res.message,
      });

      return;
    });
  };
  // check if item is in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Plus className="w-4 h-4" />
      )}{" "}
      Add To Cart
    </Button>
  );
};

export default AddToCart;
