import type { RouteRecord } from "vite-react-ssg";
import { Layout } from "./Layout";

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        lazy: () => import("./pages/home"),
      },
      {
        path: "original",
        lazy: () => import("./pages/original"),
        entry: "app/pages/original/Original.tsx",
      },
      {
        path: "scrap",
        lazy: () => import("./pages/scrap"),
        entry: "app/pages/scrap/Scrap.tsx",
      },
    ],
  },
];
