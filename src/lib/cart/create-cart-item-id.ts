interface CreateCartItemIdParams {
  productId: string;
  color?: string | null;
  size?: string | null;
}

export function createCartItemId({
  productId,
  color,
  size,
}: CreateCartItemIdParams) {
  return [
    productId,
    color ?? "default",
    size ?? "default",
  ].join("-");
}