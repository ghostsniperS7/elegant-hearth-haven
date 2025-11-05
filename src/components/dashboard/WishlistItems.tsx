import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Trash2, ShoppingCart } from "lucide-react";

interface WishlistItem {
  id: string;
  product_name: string;
  product_image: string | null;
  price: number;
  created_at: string;
}

interface WishlistItemsProps {
  userId: string;
}

export default function WishlistItems({ userId }: WishlistItemsProps) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchWishlistItems();
  }, [userId]);

  const fetchWishlistItems = async () => {
    try {
      const { data, error } = await supabase
        .from("wishlist_items")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (id: string) => {
    try {
      const { error } = await supabase.from("wishlist_items").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Removed from wishlist",
        description: "Item removed successfully.",
      });

      fetchWishlistItems();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading wishlist...</div>;
  }

  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Wishlist</CardTitle>
          <CardDescription>You haven't added any items to your wishlist yet.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-playfair font-bold">My Wishlist</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            {item.product_image && (
              <img
                src={item.product_image}
                alt={item.product_name}
                className="w-full h-48 object-cover"
              />
            )}
            <CardHeader>
              <CardTitle className="text-lg">{item.product_name}</CardTitle>
              <CardDescription className="text-2xl font-bold text-primary">
                ${item.price.toFixed(2)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="default">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => handleRemoveItem(item.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}