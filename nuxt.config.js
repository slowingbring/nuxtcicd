module.exports = {
    router: {
        linkActiveClass: "active",
        extendRoutes(routes, resolve) {
            routes.splice(0);
            routes.push(
                ...[
                    {
                        path: "/",
                        name: "home",
                        component: resolve(__dirname, "pages/home/"),
                    },
                    {
                        path: "/login",
                        name: "login",
                        component: resolve(__dirname, "pages/login/"),
                    },
                    {
                        path: "/register",
                        name: "register",
                        component: resolve(__dirname, "pages/login/"),
                    },
                    {
                        path: "/settings",
                        name: "settings",
                        component: resolve(__dirname, "pages/settings/"),
                    },
                    {
                        path: "/editor/:slug?",
                        name: "editor",
                        component: resolve(__dirname, "pages/editor/"),
                    },
                    {
                        path: "/articles/:slug",
                        name: "articlesSlug",
                        component: resolve(__dirname, "pages/articles/"),
                    },
                    {
                        path: "/favorites/:username",
                        name: "favorites",
                        component: resolve(__dirname, "pages/favorites/"),
                    },
                ]
            );
        },
    },
    server: {
        host: "0.0.0.0",
        port: 3389,
    },
    plugins: ["~/plugins/axios", "~/plugins/dayjs.js", "~/plugins/mixins.js"],
};
