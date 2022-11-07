import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import differenceInDays from "https://deno.land/x/date_fns@v2.22.1/differenceInDays/index.ts";
import { dbClient } from "../db/client.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { data } = await dbClient
      .from("days")
      .select()
      .order("created_at", { ascending: false })
      .limit(1);

    const lastFireDate = data?.[0].created_at ?? 0;
    const daysSinceLastFire = differenceInDays(
      new Date(),
      new Date(lastFireDate)
    );

    return ctx.render({ daysSinceLastFire });
  },
  async POST() {
    const created_at = new Date().toISOString();
    const { error } = await dbClient.from("days").insert({ created_at });

    if (error) {
      return new Response(JSON.stringify({ status: 400 }));
    }

    return new Response(JSON.stringify({ daysSinceLastFire: 0 }), {
      status: 301,
      headers: {
        Location: "/",
        "content-type": "application/json",
      },
    });
  },
};

export default function Home({
  data: { daysSinceLastFire },
}: PageProps<{ daysSinceLastFire: number }>) {
  return (
    <div class={""}>
      <Head>
        <title>Fire Tracker</title>
        <link
          rel="icon"
          href="https://www.popeyes.com/assets/plk/favicon.ico"
        />
      </Head>

      <main class={"main"}>
        <h1 className={"title"}>{daysSinceLastFire} Days Since Last 🔥🔥🔥</h1>
        <form action="/" method="POST">
          <button type="submit"> Reset</button>
        </form>
      </main>
    </div>
  );
}
