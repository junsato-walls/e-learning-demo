
import { createServerComponentClient, SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "@/lib/database.types";

const getAllLessons = async (supabase: SupabaseClient<Database>) => {
  const { data: lessons } = await supabase.from("lesson").select("*");
  return lessons
}

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });
  const lessons = await getAllLessons(supabase)
  return (
    <main className="w-full max-w-3xl mx-auto my-16 px-2">
      {lessons?.map((Lesson) => (
        <Link href={`/${Lesson.id}`} key={Lesson.id}>
          <Card>
            <CardHeader>
              <CardTitle>{Lesson.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{Lesson.description}</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </main>
  );
}
