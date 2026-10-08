import { QueryClient } from "@tanstack/react-query";
import { createHashHistory, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Static export: hash history so the page works from any folder/FTP path.
const useHash = import.meta.env.VITE_STATIC_EXPORT === "true" && typeof window !== "undefined";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    ...(useHash ? { history: createHashHistory() } : {}),
  });

  return router;
};
