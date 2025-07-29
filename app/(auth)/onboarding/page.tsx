import { currentUser } from "@clerk/nextjs/server";
import AccountProfile from "@/components/forms/AccountProfile";

 async function Onboarding() {
  const user = await currentUser();

  const userInfo = {};

  const userData ={
    id: user?.id,
    objectId: user?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
  }

  return (
    <>
      <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
        <h1 className="text-bold text-white">Onboarding</h1>
        <p  className="mt-3 text-white text-base-regular">Complete your profile now to use Knit</p>
        <section className="mt-3 border-white border-1 rounded-lg text-white bg-black p-10">
          <AccountProfile user={userData} btnTitle="Continue"/>
        </section>
      </main>
    </>
  );
}

export default Onboarding;