import PageTitle from "@/components/common/pages-title";
import { ShoppingCartCheck02Icon } from "@hugeicons/core-free-icons";
import CartDrawer from "@/components/cart/CartDrawer";
import CartSummary from "@/components/cart/CartSummary";

const CartPage = () => {
  return (
    <main className="min-h-screen pb-16">
      <div className="wrapper">
        {/* _______Heading________ */}
        <div className="mt-36">
          <PageTitle
            title="Your Cart"
            icon={ShoppingCartCheck02Icon}
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: "Cart" },
            ]}
          />
        </div>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <CartDrawer />
          <CartSummary />
        </div>
      </div>
    </main>
  );
};

export default CartPage;
