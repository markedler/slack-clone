import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware(async (request) => {
  if (!isPublicPage(request) && !(await isAuthenticatedNextjs())) {
    console.log("user not authenticated, redirecting to /auth");
    return nextjsMiddlewareRedirect(request, "/auth");
  }
  if (isPublicPage(request) && (await isAuthenticatedNextjs())) {
    console.log("user authenticated, redirecting to /");
    return nextjsMiddlewareRedirect(request, "/");
  }
  // TODO: Redirect user away from "/auth" if authenticated
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
