import { createRouter, createWebHashHistory } from "vue-router";
import routerMap from "./constantRouterMap";
import { Performance } from "@renderer/utils";

const router = createRouter({
    history: createWebHashHistory(),
    routes: routerMap,
});

// 监视路由性能
let end: null | ((name2?: string) => void) = null;

const performance = new Performance();

router.beforeEach((to, from, next) => {
    end = performance.startExecute(`${from.path} => ${to.path} 路由耗时`); /// 路由性能监控
    next();
    setTimeout(() => {
        if (end) {
            end();
        }
    }, 0);
});

export default router;
