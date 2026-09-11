"use client";

import { productDefaultValues } from "@/lib/constants";
import { insertProductSchema, updateProductSchema } from "@/lib/validators";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { RadioGroup } from "../ui/radio-group";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import slugify from "slugify";
import { Card, CardContent } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { createProduct, updateProduct } from "@/lib/actions/product.actions";
import { toast } from "../ui/toast";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";
import { Checkbox } from "../ui/checkbox";

// export const updateProductFormSchema = updateProductSchema.omit({
//   id: true,
// });

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: "Create" | "Update";
  product?: Product;
  productId?: string;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver:
      type === "Update"
        ? zodResolver(updateProductSchema)
        : zodResolver(insertProductSchema),
    defaultValues:
      product && type === "Update" ? product : productDefaultValues,
  });

  const onSubmit: SubmitHandler<z.infer<typeof insertProductSchema>> = async (
    values,
  ) => {
    if (type === "Create") {
      const res = await createProduct(values);

      if (!res.success) {
        toast.add({
          type: "error",
          description: res.message,
        });
      } else {
        toast.add({
          description: res.message,
        });
        router.push("/admin/products");
      }
    } else if (type === "Update") {
      if (!productId) {
        router.push("/admin/products");
        return;
      }

      const res = await updateProduct({ ...values, id: productId });

      if (!res.success) {
        toast.add({
          type: "error",
          description: res.message,
        });
      } else {
        toast.add({
          description: res.message,
        });
        router.push("/admin/products");
      }
    }
  };

  const images = form.watch("images");
  const isFeatured = form.watch("isFeatured");
  const banner = form.watch("banner");

  return (
    <form
      method="POST"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row gap-5">
        {/* Name */}
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-name">Full Name</FieldLabel>
                <Input
                  placeholder="Enter product name"
                  {...field}
                  id="form-rhf-demo-name"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Slug */}
          <Controller
            name="slug"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-slug">Slug</FieldLabel>
                <div className="relative">
                  <Input
                    placeholder="Enter slug"
                    {...field}
                    id="form-rhf-demo-slug"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  <Button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2"
                    onClick={() => {
                      form.setValue(
                        "slug",
                        slugify(form.getValues("name"), { lower: true }),
                      );
                    }}
                  >
                    Generate
                  </Button>
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        {/* Category */}
        <FieldGroup>
          <Controller
            name="category"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-category">Category</FieldLabel>
                <Input
                  placeholder="Enter category"
                  {...field}
                  id="form-rhf-demo-category"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Brand */}
          <Controller
            name="brand"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-brand">Brand</FieldLabel>
                <Input
                  placeholder="Enter brand"
                  {...field}
                  id="form-rhf-demo-brand"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <FieldGroup>
          {/* Price */}
          <Controller
            name="price"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-price">Price</FieldLabel>
                <Input
                  placeholder="Enter price"
                  {...field}
                  id="form-rhf-demo-price"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Stock */}
          <Controller
            name="stock"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-stock">Stock</FieldLabel>
                <Input
                  placeholder="Enter stock"
                  {...field}
                  id="form-rhf-demo-stock"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>
      <div className="upload-field flex flex-col md:flex-row gap-5">
        {/* Images */}
        <Controller
          name="images"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-stock">Images</FieldLabel>
              <Card>
                <CardContent className="space-y-2 mt-2 min-h-48">
                  <div className="flex-start space-x-2">
                    {images.map((image: string) => (
                      <Image
                        key={image}
                        src={image}
                        alt="product image"
                        className="w-20 h-20 object-cover object-center rounded-sm"
                        width={100}
                        height={100}
                      />
                    ))}
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res: { url: string }[]) => {
                        form.setValue("images", [...images, res[0].url]);
                      }}
                      onUploadError={(error: Error) => {
                        toast.add({
                          type: "error",
                          description: `ERROR! ${error.message}`,
                        });
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <div className="upload-field">
        {/* isFeatured */}
        Featured Product
        <Card>
          <CardContent className="space-y-2 mt-2">
            <Controller
              name="isFeatured"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-isFeatured">
                    Is Featured?
                  </FieldLabel>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {isFeatured && banner && (
              <Image
                src={banner}
                alt="banner image"
                className="w-full object-cover object-center rounded-sm"
                width={1920}
                height={680}
              />
            )}

            {isFeatured && !banner && (
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res: { url: string }[]) => {
                  form.setValue("banner", res[0].url);
                }}
                onUploadError={(error: Error) => {
                  toast.add({
                    type: "error",
                    description: `ERROR! ${error.message}`,
                  });
                }}
              />
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        {/* Description */}
        <FieldGroup>
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-description">
                  Description
                </FieldLabel>
                <Textarea
                  placeholder="Enter description"
                  {...field}
                  id="form-rhf-demo-description"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>

      <div>
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Submitting" : `${type} Product`}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
