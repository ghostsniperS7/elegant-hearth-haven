import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Plus, Trash2 } from "lucide-react";
import { addressSchema, AddressFormData } from "@/lib/validations";

interface Address {
  id: string;
  label: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

interface SavedAddressesProps {
  userId: string;
}

interface FormErrors {
  label?: string;
  street_address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
}

const initialAddressState = {
  label: "",
  street_address: "",
  city: "",
  state: "",
  postal_code: "",
  country: "USA",
};

export default function SavedAddresses({ userId }: SavedAddressesProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const { toast } = useToast();

  const [newAddress, setNewAddress] = useState(initialAddressState);

  useEffect(() => {
    fetchAddresses();
  }, [userId]);

  const fetchAddresses = async () => {
    try {
      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", userId)
        .order("is_default", { ascending: false });

      if (error) throw error;
      setAddresses(data || []);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): AddressFormData | null => {
    const result = addressSchema.safeParse(newAddress);
    
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormErrors;
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      return null;
    }
    
    setErrors({});
    return result.data;
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validatedData = validateForm();
    if (!validatedData) return;

    try {
      const { error } = await supabase.from("addresses").insert({
        user_id: userId,
        label: validatedData.label.trim(),
        street_address: validatedData.street_address.trim(),
        city: validatedData.city.trim(),
        state: validatedData.state.trim(),
        postal_code: validatedData.postal_code.trim(),
        country: validatedData.country.trim(),
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Address added successfully.",
      });

      setIsDialogOpen(false);
      setNewAddress(initialAddressState);
      setErrors({});
      fetchAddresses();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add address. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      const { error } = await supabase.from("addresses").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Address deleted successfully.",
      });

      fetchAddresses();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete address. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setNewAddress(initialAddressState);
      setErrors({});
    }
  };

  const updateField = (field: keyof typeof newAddress, value: string) => {
    setNewAddress({ ...newAddress, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading addresses...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-playfair font-bold">Saved Addresses</h2>
        <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Address
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleAddAddress}>
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
                <DialogDescription>
                  Add a new shipping or billing address.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="label">Label</Label>
                  <Input
                    id="label"
                    placeholder="Home, Office, etc."
                    value={newAddress.label}
                    onChange={(e) => updateField("label", e.target.value)}
                    maxLength={50}
                    aria-invalid={!!errors.label}
                    aria-describedby={errors.label ? "label-error" : undefined}
                  />
                  {errors.label && (
                    <p id="label-error" className="text-sm text-destructive">
                      {errors.label}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    placeholder="123 Main St"
                    value={newAddress.street_address}
                    onChange={(e) => updateField("street_address", e.target.value)}
                    maxLength={200}
                    aria-invalid={!!errors.street_address}
                    aria-describedby={errors.street_address ? "street-error" : undefined}
                  />
                  {errors.street_address && (
                    <p id="street-error" className="text-sm text-destructive">
                      {errors.street_address}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      value={newAddress.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      maxLength={100}
                      aria-invalid={!!errors.city}
                      aria-describedby={errors.city ? "city-error" : undefined}
                    />
                    {errors.city && (
                      <p id="city-error" className="text-sm text-destructive">
                        {errors.city}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="NY"
                      value={newAddress.state}
                      onChange={(e) => updateField("state", e.target.value)}
                      maxLength={50}
                      aria-invalid={!!errors.state}
                      aria-describedby={errors.state ? "state-error" : undefined}
                    />
                    {errors.state && (
                      <p id="state-error" className="text-sm text-destructive">
                        {errors.state}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal">Postal Code</Label>
                  <Input
                    id="postal"
                    placeholder="10001"
                    value={newAddress.postal_code}
                    onChange={(e) => updateField("postal_code", e.target.value)}
                    maxLength={20}
                    aria-invalid={!!errors.postal_code}
                    aria-describedby={errors.postal_code ? "postal-error" : undefined}
                  />
                  {errors.postal_code && (
                    <p id="postal-error" className="text-sm text-destructive">
                      {errors.postal_code}
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Address</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Saved Addresses</CardTitle>
            <CardDescription>Add your first address to get started.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{address.label}</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteAddress(address.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{address.street_address}</p>
                <p className="text-sm">
                  {address.city}, {address.state} {address.postal_code}
                </p>
                <p className="text-sm">{address.country}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
