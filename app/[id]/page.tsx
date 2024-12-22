
import { createServerComponentClient, SupabaseClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers"
import { Database } from "@/lib/database.types";
import { YouTubeEmbed } from "@next/third-parties/google"
import { extractYouTubeVideoId } from "@/utils/extractYoutubeVideoId";
const getDetailLesson = async (id: number, supabase: SupabaseClient<Database>) => {
    const { data: lesson } = await supabase
    .from("lesson")
    .select("*")
    .eq("id",id)
    .single();
    return lesson;
}

const getpremiumContent = async (id: number, supabase: SupabaseClient<Database>) => {
    const { data: video } = await supabase
    .from("premium_content")
    .select("video_url")
    .eq("id",id)
    .single();
    return video;
}

const LessonDetailPage = async ({ params }: { params: { id: number } }) => {
    const supabase = createServerComponentClient<Database>({ cookies });
    const lesson = await getDetailLesson(params.id, supabase);
    const video = await getpremiumContent(params.id, supabase);
    const videoid = extractYouTubeVideoId(video?.video_url as string) as string;
    // console.log(video)
    // console.log(lesson?.created_at)
    return (
        <div className="w-full max-w-3xl mx-auto py-16 px-8">
            <h1 className="text-3xl mb-6">{lesson?.title}</h1>
            <p className="mb-8">{lesson?.description}</p>
            <YouTubeEmbed height={400} videoid={videoid} />

        </div>
    )    
}

export default LessonDetailPage