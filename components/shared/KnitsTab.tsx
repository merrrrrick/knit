import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";
import KnitCard from "../cards/KnitCard";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const KnitsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  let result = await fetchUserPosts(accountId);
  if (!result) redirect("/");
  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.knits.map((knit: any) => (
        <KnitCard
          key={knit._id}
          id={knit._id}
          currentUserId={currentUserId}
          parentId={knit.parentId}
          content={knit.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: knit.author.name,
                  image: knit.author.image,
                  id: knit.author.id,
                }
          }
          community={knit.community}
          createdAt={knit.createdAt}
          comments={knit.children}
        />
      ))}
    </section>
  );
};

export default KnitsTab;
