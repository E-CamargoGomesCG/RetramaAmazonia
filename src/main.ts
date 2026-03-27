import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia"; 
import App from './App.vue'
import "./assets/styles/main.css";

import HomePage from "./pages/HomePage.vue";
import CatalogPage from "./pages/CatalogPage.vue";
import ProductDetailPage from "./pages/ProductDetailPage.vue";
import ShoppingCartPage from "./pages/ShoppingCartPage.vue";
import CheckoutPage from "./pages/CheckoutPage.vue";
import UserProfilePage from "./pages/UserProfilePage.vue";
import FavoritesPage from "./pages/FavoritesPage.vue";
import SobrePage from "./pages/SobrePage.vue";

const routes = [


  { path: "/", name: "home", component: HomePage },
  { path: "/catalogo", name: "catalog", component: CatalogPage },
  { path: "/sobre", name: "about", component: SobrePage },
  { path: "/produto/:id", name: "product", component: ProductDetailPage },
  { path: "/carrinho", name: "cart", component: ShoppingCartPage },
  { path: "/checkout", name: "checkout", component: CheckoutPage },
  { path: "/minha-conta", name: "profile", component: UserProfilePage },
  { path: "/favoritos", name: "favorites", component: FavoritesPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }
    return { top: 0 };
  },
});

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

app.use(router);
app.mount("#app");
