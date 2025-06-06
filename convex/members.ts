import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const current = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (convexToJson, args) => {
    const userId = await getAuthUserId(convexToJson);
    if (!userId) {
      return null;
    }
    const member = await convexToJson.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!member) {
      return null;
    }
    return member;
  },
});
