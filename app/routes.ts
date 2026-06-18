import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("/auth", "routes/AuthPage.tsx"), route("/upload", "routes/Upload.tsx"), route("/results", "routes/Results.tsx")] satisfies RouteConfig;
