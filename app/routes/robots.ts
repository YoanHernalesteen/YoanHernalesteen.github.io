import { buildRobots } from "~/seo";

// Route « ressource » prérendue en build/client/robots.txt.
export function loader() {
  return new Response(buildRobots(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
