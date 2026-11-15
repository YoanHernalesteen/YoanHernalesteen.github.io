import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("cas", "routes/cases.tsx"),
  route("cas/:slug", "routes/case.tsx"),
  route("a-propos", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
  route("mentions-legales", "routes/legal.tsx"),
] satisfies RouteConfig;
