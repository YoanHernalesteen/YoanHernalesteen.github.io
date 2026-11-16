import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("cas", "routes/cases.tsx"),
  route("cas/:slug", "routes/case.tsx"),
  route("mentions-legales", "routes/legal.tsx"),
] satisfies RouteConfig;
