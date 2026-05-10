interface NavlinkChildProp {
  label: string;
  href: string; // Stringify label
}

interface adContentProps {
  name: string;
  href: string; // Stringify label
  price: number;
  comparePrice?: number;
  image: string; // later add sanity
  rating?: number
  isNew?: boolean
  isFeatured?: boolean
  isBestSale?: boolean
}

export interface NavlinkProps {
  label: string;
  href: string; // Stringify label
  icon?: any; // change go hugeicons types
  children?: NavlinkChildProp[];
  adContent?: adContentProps[]; // a carousel of products in a mega menu
}
