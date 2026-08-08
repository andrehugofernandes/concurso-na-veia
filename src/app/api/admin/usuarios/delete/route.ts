import { NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    // 1. Verify caller is an admin
    const supabaseServer = await createClient();
    const { data: { user } } = await supabaseServer.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabaseServer
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || (profile.role !== "admin" && profile.role !== "sysadmin")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 2. Parse body for user IDs
    const body = await request.json();
    const { userIds } = body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json({ error: "No user IDs provided" }, { status: 400 });
    }

    // 3. Prevent self-deletion
    if (userIds.includes(user.id)) {
      return NextResponse.json({ error: "You cannot delete your own account" }, { status: 400 });
    }

    // 4. Initialize Supabase Service Role client to bypass RLS and delete from Auth
    const supabaseAdmin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    let deletedCount = 0;
    const errors = [];

    // 5. Delete users iteratively
    for (const id of userIds) {
      // supabase.auth.admin.deleteUser automatically deletes the user from the auth schema.
      // Assuming you have a cascade delete set up, this will also delete the `profiles` row.
      const { data, error } = await supabaseAdmin.auth.admin.deleteUser(id);
      
      if (error) {
        errors.push({ id, error: error.message });
      } else {
        deletedCount++;
      }
    }

    if (errors.length > 0) {
      return NextResponse.json({ 
        message: `Deleted ${deletedCount} users with ${errors.length} errors`,
        errors 
      }, { status: 207 });
    }

    return NextResponse.json({ success: true, deletedCount });

  } catch (error: any) {
    console.error("[API Admin Delete Users]", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
