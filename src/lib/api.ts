import { supabase } from "./supabase";

export type Page = {
  id: string;
  workspace_id: string;
  title: string;
  icon: string | null;
  is_published: boolean;
  is_trashed: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type Block = {
  id: string;
  page_id: string;
  type: string;
  content: string;
  position: number;
  created_by: string;
  meta?: Record<string, any>;
};

export type Database = {
  id: string;
  workspace_id: string;
  name: string;
  icon: string | null;
  created_by: string;
  created_at: string;
};

export type DatabaseRow = {
  id: string;
  database_id: string;
  title: string;
  status: string;
  priority: string;
  assignee: string;
  due: string;
  tag: string;
  position: number;
};

export type DatabaseColumn = {
  id: string;
  database_id: string;
  name: string;
  type: string;
  options: any;
  position: number;
};

export type WikiPage = {
  id: string;
  workspace_id: string;
  parent_page_id: string | null;
  title: string;
  icon: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  avatar_url: string | null;
};

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getUserProfile(userId: string) {
  const { data } = await supabase.from("users").select("*").eq("id", userId).single();
  return data as UserProfile | null;
}

export async function getUserWorkspace(userId: string) {
  const { data: member, error: err1 } = await supabase
    .from("workspace_members")
    .select("workspace_id")
    .eq("user_id", userId)
    .maybeSingle();
  if (err1) console.error("getUserWorkspace member error:", err1);
  if (member?.workspace_id) return member.workspace_id;

  const { data: workspace, error: err2 } = await supabase
    .from("workspaces")
    .select("id")
    .eq("owner_id", userId)
    .maybeSingle();
  if (err2) console.error("getUserWorkspace owner error:", err2);
  return workspace?.id as string | undefined;
}

export async function getPages(workspaceId: string) {
  const { data } = await supabase
    .from("pages")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("is_trashed", false)
    .order("updated_at", { ascending: false });
  return (data || []) as Page[];
}

export async function getPageById(pageId: string) {
  const { data } = await supabase
    .from("pages")
    .select("*, blocks(*)")
    .eq("id", pageId)
    .single();
  return data as (Page & { blocks: Block[] }) | null;
}

export async function createPage(workspaceId: string, userId: string, title: string) {
  const { data, error } = await supabase.from("pages").insert({
    workspace_id: workspaceId,
    title,
    created_by: userId,
  }).select("id").single();
  if (error) console.error("createPage error:", error);
  return data?.id as string | undefined;
}

export async function getDatabases(workspaceId: string) {
  const { data } = await supabase
    .from("databases")
    .select("*, database_columns(*), database_records(*)")
    .eq("workspace_id", workspaceId)
    .eq("is_trashed", false);
  return (data || []) as (Database & { database_columns: DatabaseColumn[]; database_records: any[] })[];
}

export async function getWikiPages(workspaceId: string) {
  const { data } = await supabase
    .from("pages")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("is_trashed", false)
    .order("created_at", { ascending: true });
  return (data || []) as WikiPage[];
}

export async function getRecentActivity(workspaceId: string) {
  const { data } = await supabase
    .from("pages")
    .select("id, title, updated_at, created_by")
    .eq("workspace_id", workspaceId)
    .eq("is_trashed", false)
    .order("updated_at", { ascending: false })
    .limit(10);
  return (data || []) as { id: string; title: string; updated_at: string; created_by: string }[];
}

export async function updateProfile(userId: string, updates: Partial<UserProfile>) {
  const { error } = await supabase.from("users").update(updates).eq("id", userId);
  return { error };
}

export type DatabaseRecordWithValues = {
  id: string;
  database_id: string;
  position: number;
  created_at: string;
  values: Record<string, string>;
};

export async function getDatabaseRecords(databaseId: string) {
  const { data: columns } = await supabase
    .from("database_columns")
    .select("id, database_id, name, type, options, position")
    .eq("database_id", databaseId)
    .order("position");
  const { data: records } = await supabase
    .from("database_records")
    .select("id, database_id, position, created_at")
    .eq("database_id", databaseId)
    .order("position");
  if (!columns || !records) return { columns: [], records: [] as DatabaseRecordWithValues[] };

  const colMap = Object.fromEntries(columns.map(c => [c.id, c.name]));
  const recordIds = records.map(r => r.id);
  const { data: values } = await supabase
    .from("database_record_values")
    .select("record_id, column_id, value")
    .in("record_id", recordIds);

  const recordsWithValues = records.map(rec => {
    const vals: Record<string, string> = {};
    (values || []).filter(v => v.record_id === rec.id).forEach(v => {
      vals[colMap[v.column_id] || v.column_id] = v.value;
    });
    return { ...rec, values: vals };
  });

  return { columns, records: recordsWithValues };
}

export async function updatePageTitle(pageId: string, title: string) {
  await supabase.from("pages").update({ title }).eq("id", pageId);
}

export async function updateUserProfile(userId: string, name: string) {
  const { error } = await supabase.from("users").update({ name }).eq("id", userId);
  return { error };
}

export async function getTrashedPages(workspaceId: string) {
  const { data } = await supabase
    .from("pages")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("is_trashed", true)
    .order("updated_at", { ascending: false });
  return (data || []) as Page[];
}

export async function getInboxCount(userId: string) {
  const { data } = await supabase
    .from("guest_page_permissions")
    .select("id", { count: "exact" })
    .eq("guest_id", userId);
  return data?.length || 0;
}

export async function getInboxPages(userId: string) {
  const { data: permissions } = await supabase
    .from("guest_page_permissions")
    .select("page_id")
    .eq("guest_id", userId);
  if (!permissions || permissions.length === 0) return [];
  const pageIds = permissions.map(p => p.page_id);
  const { data } = await supabase
    .from("pages")
    .select("*")
    .in("id", pageIds)
    .order("updated_at", { ascending: false });
  return (data || []) as Page[];
}

export async function trashPage(pageId: string) {
  await supabase.from("pages").update({ is_trashed: true }).eq("id", pageId);
}

export async function restorePage(pageId: string) {
  await supabase.from("pages").update({ is_trashed: false }).eq("id", pageId);
}

export async function deletePagePermanently(pageId: string) {
  await supabase.from("pages").delete().eq("id", pageId);
}

export async function getFavoritedPages(workspaceId: string) {
  const { data } = await supabase
    .from("pages")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("is_trashed", false)
    .not("icon", "is", null)
    .order("updated_at", { ascending: false });
  return (data || []) as Page[];
}

export async function createDatabase(workspaceId: string, userId: string, name: string) {
  const { data, error } = await supabase.from("databases").insert({
    workspace_id: workspaceId,
    name,
    created_by: userId,
  }).select("id").single();
  if (error) { console.error("createDatabase error:", error); return undefined; }
  return data?.id as string | undefined;
}

export async function createDatabaseColumn(databaseId: string, name: string, type: string, position: number) {
  const { data, error } = await supabase.from("database_columns").insert({
    database_id: databaseId,
    name,
    type,
    position,
  }).select("id").single();
  if (error) { console.error("createDatabaseColumn error:", error); return undefined; }
  return data?.id as string | undefined;
}

export async function createDatabaseRecord(databaseId: string, userId: string, position: number) {
  const { data, error } = await supabase.from("database_records").insert({
    database_id: databaseId,
    created_by: userId,
    position,
  }).select("id").single();
  if (error) { console.error("createDatabaseRecord error:", error); return undefined; }
  return data?.id as string | undefined;
}

export async function setRecordValue(recordId: string, columnId: string, value: string) {
  const { data: existing, error: findErr } = await supabase
    .from("database_record_values")
    .select("id")
    .eq("record_id", recordId)
    .eq("column_id", columnId)
    .maybeSingle();
  if (findErr) { console.error("setRecordValue find error:", findErr); return; }
  if (existing) {
    const { error } = await supabase.from("database_record_values").update({ value }).eq("id", existing.id);
    if (error) console.error("setRecordValue update error:", error);
  } else {
    const { error } = await supabase.from("database_record_values").insert({ record_id: recordId, column_id: columnId, value });
    if (error) console.error("setRecordValue insert error:", error);
  }
}

export async function updatePageIcon(pageId: string, icon: string | null) {
  await supabase.from("pages").update({ icon }).eq("id", pageId);
}

export async function togglePagePin(pageId: string, currentIcon: string | null) {
  const newIcon = currentIcon === "⭐" ? null : "⭐";
  await updatePageIcon(pageId, newIcon);
}

export async function createBlock(pageId: string, userId: string, type: string, content: string, position: number) {
  const { data } = await supabase.from("blocks").insert({
    page_id: pageId,
    type,
    content,
    position,
    created_by: userId,
  }).select("id").single();
  return data?.id as string | undefined;
}
