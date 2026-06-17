
"use server";
import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase";
import { revalidatePath } from "next/cache";


export const createCompanion = async (formData: CreateCompanion)=>{
     const {userId:author} = await auth();
     const supabase = createSupabaseClient();
     
     const {data, error}  = await supabase.from('companions')
     .insert({...formData, author})
     .select();
     if(error || !data) throw new Error(error?.message || 'Failed to create companion');

     return data[0];
    }

export const getAllCompanions = async ({limit=10, page=1, subject, topic}: GetAllCompanions) => {
   

  const supabase = createSupabaseClient();

   let query = supabase.from('companions').select();

   if(subject && topic){
      query = query.ilike('subject', `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);

   }else if(subject){
     query = query.ilike('subject', `%${subject}%`);
   }else if(topic){
     query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
   }

   query = query.range((page-1)*limit, page * limit - 1);

   const {data: companions, error} = await query;
   if(error) throw new Error(error.message);
   
   return  await checkBookmarked(companions);
}

const checkBookmarked = async (companions) => {
  const {userId} = await auth();
  const supabase = createSupabaseClient();
  const {data:bookmarks, error} = await supabase.from('bookmarks')
  .select("companion_id")
  .eq("user_id",userId);

  const bookmarkedSet = new Set(
    bookmarks?.map((b) => b.companion_id)
  );

  const companionsWithBookmarks = companions?.map((companion) => ({
    ...companion,
    bookmarked: bookmarkedSet.has(companion.id)
  }));

  return companionsWithBookmarks;
}

export const getCompanion = async (id:string) =>{
  const supabase = createSupabaseClient();
  const {data, error} = await supabase.from('companions')
  .select().eq('id', id);

  if(error) return console.log(error);

  return data[0];

}

export const addToSessionHistory = async(companionId: string) => {
  const {userId} = await auth();
  const supabase = createSupabaseClient();

  // Companion already exists, then update the date
  const {data:existing} = await supabase.from('session_history')
  .select("*")
  .eq("user_id", userId)
  .eq("companion_id", companionId)
  .single();
  if(existing){
    const {data, error} = await supabase.from('session_history')
    .update({
      created_at: new Date().toISOString(),
    })
    .eq("id", existing.id);

    if(error) throw new Error(error.message);
    return data;
  }

// New companion history
  const {data, error} = await supabase.from('session_history')
  .insert({
    companion_id: companionId,
    user_id: userId,
  });
  if(error) throw new Error(error.message);

  return data;
}

export const getRecentSession = async (limit = 10) => {
  const supabase = createSupabaseClient();
  const {data, error} = await supabase.from('session_history')
  .select(`companions:companion_id (*)`)
  .order('created_at', {ascending:false})
  .limit(limit);

  if(error) throw new Error(error.message);

  return data.map(({companions}) => companions);
}

export const getUserSession = async (userId:string, limit=10) => {
  const supabase = createSupabaseClient();
  const {data, error} = await supabase.from('session_history')
  .select(`companions:companion_id (*)`)
  .eq('user_id', userId)
  .order('created_at', {ascending:false})
  .limit(limit);

  if(error) throw new Error(error.message);

  return data.map(({companions}) => companions);
}

export const getUserCompanions = async (userId:string) => {
  const supabase = createSupabaseClient();
  const {data, error} = await supabase.from('companions')
  .select()
  .eq("author", userId);

  if(error) throw new Error(error.message);
  return data;
}

export const newCompanionPermissions = async () => {
  const {userId, has} = await auth();
  const supabase = createSupabaseClient();

  let limit = 0;
  if(has({plan: 'pro'})){
    return true;
  }else if(has({feature: "3_companion_limit"})){
    limit=3;
  }else if(has({feature: "10_companion_limit"})){
    limit=10;
  }

  const {data, error} = await supabase.from('companions')
  .select('id', {count: 'exact'})
  .eq('author', userId);

  if(error) throw new Error(error.message);

  const companionCount = data?.length;
  if(companionCount >= limit){
    return false 
  }else {
    return true;
  }

}

export const addBookmark = async (companionId:string, path:string) => {
  const {userId} = await auth();
  if(!userId){
    return;
  }

  const supabase = createSupabaseClient();

  //  const {data:existing, error:fetchError} = await supabase.from('bookmarks')
  // .select("*")
  // .eq("user_id", userId)
  // .eq("companion_id", companionId)
  // .single();

  // if(fetchError){
  //   throw new Error(fetchError.message);
  // }
  // if(existing){
  //   return existing;
  // }

  const {data, error} = await supabase.from('bookmarks')
  .upsert({
    companion_id: companionId,
    user_id: userId,
  },{
    onConflict: "user_id, companion_id",
    ignoreDuplicates: true,
  }
);
  
  if(error) throw new Error(error.message);

  revalidatePath(path);
  return data;
} 

export const removeBookmark = async(companionId:string, path:string) => {
  const {userId} = await auth();
  if(!userId) return;

  const supabase = createSupabaseClient();

  const {data, error} = await supabase
  .from("bookmarks")
  .delete()
  .eq("companion_id", companionId)
  .eq("user_id", userId);


  if (error) {
    throw new Error(error.message);
  }
  revalidatePath(path);
  return data;
}


export const getBookmarkedCompanions = async (userId:string)=> {
  const supabase = createSupabaseClient();
  const {data, error} = await supabase.from('bookmarks')
  .select(`companions:companion_id (*)`)
  .eq('user_id', userId);

  if(error){
    throw new Error(error.message);
  }

  return data.map(({companions}) => companions);
}