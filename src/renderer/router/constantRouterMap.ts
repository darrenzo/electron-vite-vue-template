import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/:pathMatch(.*)*",
        component: () => import("@renderer/views/page-404.vue")
    },
    { path: "/", redirect: "/land-page" },
    {
        path: "/land-page",
        name: "land-page",
        component: () => import("@renderer/views/land-page.vue")
    },
    {
        path: "/other-page",
        name: "other-page",
        component: () => import("@renderer/views/other-page.vue")
    }
];

export default routes;
