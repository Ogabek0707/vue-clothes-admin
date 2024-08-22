export default {
    path: "/Home",
    name: "Home",
    component: import("../views/home/Main.vue"),
    children: [
      {
        path: "/Category",
        name: "Category",
        component: import("../views/home/Category.vue"),
      },
      {
        path: "/Products",
        name: "Products",
        component: import("../views/home/Products.vue"),
      },
      {
        path: "/Workers",
        name: "Workers",
        component: import("../views/home/Workers.vue"),
      },
      {
        path: "/Product-View/:id",
        name: "Product-View",
        component: import("../views/home/ProductView.vue"),
      },
    ],
  };