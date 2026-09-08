import ProductList from "@/components/shared/product/product-list";
import sampleData from "@/db/sample-data";
import { getLatestProducts } from "@/lib/actions/product.actions";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";

export default async function HomePage() {
  const latestProducts = await getLatestProducts();

  console.log("latestProducts: ", latestProducts);
  return (
    <>
      <ProductList
        title="Newest Arrival"
        data={latestProducts}
        limit={LATEST_PRODUCTS_LIMIT}
      />
    </>
  );
}
