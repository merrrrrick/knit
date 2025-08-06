
import { fetchPosts } from "@/lib/actions/knit.actions";
import { currentUser } from "@clerk/nextjs/server";
import KnitCard from "@/components/cards/KnitCard";

export default async function Home() {
  const result = await fetchPosts(1, 30);
  const user = await currentUser();
  return (
    <>
      <h1 className="head-text bg-black text-center text-white text-left">
        {" "}
        Home
      </h1>
      <section className="mt-10 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No Knits </p>
        ) : (
          <>
            {result.posts.map((post) => (
              <KnitCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id || ""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comment={post.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
