import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const activity = await getActivity(userInfo._id);

  return (
    <section>
      <h1></h1>
      <section>
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link key={activity._id} href={`/knit/${activity.parentId}`}>
                <article className="flex items-center gap-2 rounded-md bg-dark-2 px-7 py-4">
                  <Image
                    src={activity.author.image}
                    alt="Profile Image"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p className="!text-small-regular text-white">
                    <span className="mr-1 text-purple-500">{activity.author.name}</span>{" "} replied to your knit
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="text-base-regular text-white/80">No activity yet</p>
        )}
      </section>
    </section>
  );
};

export default Page;
