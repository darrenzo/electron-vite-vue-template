import router from "./router";
import Performance from "@renderer/utils/performance";

let end: null | ((name2?: string) => void) = null;
router.beforeEach((to, from, next) => {
    end = Performance.startExecute(`${from.path} => ${to.path} 路由耗时`); /// 路由性能监控
    next();
    setTimeout(() => {
        if (end) {
            end();
        }
    }, 0);
});

router.afterEach(() => {
    //
});
