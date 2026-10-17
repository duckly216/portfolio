import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home_page.tsx"),
	route("projects", "routes/projects_page.tsx"),
	route("about", "routes/about_page.tsx"),
	route("contact", "routes/contact_page.tsx"),
] satisfies RouteConfig;
