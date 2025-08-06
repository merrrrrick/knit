import KnitCard from "@/components/cards/KnitCard";
import Comment from "@/components/forms/Comment";
import { fetchKnitById } from "@/lib/actions/knit.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const knit = await fetchKnitById(params.id);

  return (
    <section className="relative">
      <div>
        <KnitCard
          key={knit._id}
          id={knit._id}
          currentUserId={user?.id || ""}
          parentId={knit.parentId}
          content={knit.text}
          author={knit.author}
          community={knit.community}
          createdAt={knit.createdAt}
          comments={knit.children}
        />
      </div>
      <div className="mt-7">
        <Comment
          knitId={knit.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>
      <div className="mt-10">
        {knit.children.map((childItem: any) => (
          <KnitCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={childItem?.id || ""}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
};

export default Page;
