import { DefaultLayout } from "~/components/Layouts";
import { HeaderFooterLayout } from "~/components/Layouts";
import { Fragment } from 'react'; // nếu k có layout

//import pages

import Home from "~/pages/Home";
import Search from "~/pages/Search";
import Contact from "~/pages/Contact";

const publicRoutes = [
    {path : '/', component: Home, layout:HeaderFooterLayout},
    {path : '/search', component:Search, layout: DefaultLayout},
    {path : '/contact', component:Contact, layout: Fragment}

]
const privateRoutes = [

]
export {publicRoutes, privateRoutes}