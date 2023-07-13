import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/:pathMatch(.*)*",
        component: () => import("@common/remote-config/views/page-404.vue"),
    },
    { path: "/", redirect: "/land-page" },
    {
        path: "/land-page",
        name: "land-page",
        component: () => import("@common/remote-config/views/land-page.vue"),
    },
    {
        path: "/other-page",
        name: "other-page",
        component: () => import("@common/remote-config/views/other-page.vue"),
    },
];

export default routes;
