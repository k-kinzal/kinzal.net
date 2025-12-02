import type { RouteRecord } from "vite-react-ssg";
import { Layout } from "./Layout";

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        lazy: () => import("./pages/Home"),
      },
      {
        path: "original.html",
        lazy: () => import("./pages/Original"),
        entry: "app/pages/Original.tsx",
      },
      {
        path: "scrap.html",
        lazy: () => import("./pages/Scrap"),
        entry: "app/pages/Scrap.tsx",
      },
    ],
  },
];
