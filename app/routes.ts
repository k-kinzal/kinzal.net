import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("original.html", "./routes/original.tsx"),
  route("scrap.html", "./routes/scrap.tsx"),
] satisfies RouteConfig;
