// src/data/menuData.js

export const womenCategories = [
  { name: "Dresses", to: "/women/dresses" },
  { name: "Co-ords", to: "/women/co-ords" },
  { name: "Tops", to: "/women/tops" },
  { name: "Pants", to: "/women/pants" },
  { name: "Skirts", to: "/women/skirts" },
  { name: "Accessories", to: "/women/accessories" },
];

export const menCategories = [
  { name: "Shirts", to: "/men/shirts" },
  { name: "Pants", to: "/men/pants" },
  { name: "Jackets", to: "/men/jackets" },
];

export const collectionsCategories = [
  { name: "Stillness in the storm", to: "/collections/stillness-in-storm" },
  { name: "Love, Me", to: "/collections/love-me" },
  { name: "Noor", to: "/collections/noor" },
  { name: "Elevated Essentials", to: "/collections/elevated-essentials" },
  { name: "Bloom", to: "/collections/bloom" },
  { name: "All Eyes On you", to: "/collections/all-eyes-on-you" },
  { name: "What if", to: "/collections/what-if" },
  { name: "sea within", to: "/collections/sea-within" },
  { name: "Escape", to: "/collections/escape" },
  { name: "Evanescence", to: "/collections/evanescence" },
  { name: "Alive", to: "/collections/alive" },
  { name: "Labyrinth", to: "/collections/labyrinth" },
];

export const desktopMainMenuItems = {
  Shop: {
    path: "/shop-all",
    subItems: [
      { name: "New Arrival", to: "/new-arrivals" },
      { name: "Women", to: "/women" },
      { name: "Men", to: "/men" },
      { name: "Collections" },
    ],
  },
  BestSellers: { path: "/best-sellers", subItems: [] },
  "New Arrival": { path: "/new-arrivals", subItems: [] },
  About: {
    path: "/about-us",
    subItems: [
      { name: "About Us", to: "/about-us" },
      { name: "LookBooks", to: "/lookbooks" },
    ],
  },
  Sale: { path: "/sale", subItems: [] },
};

export const mobileMainMenuItems = {
  Shop: {
    path: "/shop-all",
    subItems: [
      { name: "New Arrival", to: "/new-arrivals" },
      { name: "Women" },
      { name: "Men" },
      { name: "Collections" },
    ],
  },
  BestSellers: { path: "/best-sellers", subItems: [] },
  "New Arrival": { path: "/new-arrivals", subItems: [] },
  About: {
    path: "/about-us",
    subItems: [
      { name: "About Us", to: "/about-us" },
      { name: "LookBooks", to: "/lookbooks" },
    ],
  },
  Sale: { path: "/sale", subItems: [] },
  Account: {
    path: "/account",
  },
  Wishlist: {
    path: "/pages/wishlist",
  },
};
