import routes from "~/config/router";

import { DefaultLayout } from "~/Layouts";
import { HeaderFooterLayout } from "~/Layouts";
import { Fragment } from 'react'; // nếu k có layout

//import pages

import Home from "~/pages/Home";
import Search from "~/pages/Search";
import Contact from "~/pages/Contact";
import Shop from "~/pages/Shop";
import UserUpdate from "~/pages/UserUpdate";
import Product from "~/pages/Product";
import Cart from '~/pages/Cart';
const publicRoutes = [
    {path : routes.home, component: Home, layout:HeaderFooterLayout},
    {path : routes.search, component:Search, layout: DefaultLayout},
    {path : routes.shop, component:Shop, layout: HeaderFooterLayout},
    {path : routes.user_update, component:UserUpdate, layout: HeaderFooterLayout},
    {path : routes.contact, component:Contact, layout: Fragment},
    {path : routes.product, component: Product, layout: HeaderFooterLayout},
    {path : routes.cart, component: Cart, layout: HeaderFooterLayout}
]
const privateRoutes = [

]
export {publicRoutes, privateRoutes}