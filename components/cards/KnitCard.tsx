import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  likes: string[]; // new: array of userIds who liked this knit
  isComment?: boolean;
}

const KnitCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  likes,
  isComment,
}: Props) => {
  const isLiked = likes.includes(currentUserId);

  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          {/* User Profile */}
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile Image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>
            <div className="mt-2 w-0.5 grow rounded-full bg-neutral-800"></div>
          </div>

          {/* Content */}
          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer font-bold text-white">
                {author.name}
              </h4>
            </Link>
            <p className="mt-2 text-small-regular text-white/90">{content}</p>

            {/* Actions */}
            <div
              className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}
            >
              <div className="flex gap-3.5 items-center">
                {/* Like Button */}
                <div className="flex items-center gap-1 cursor-pointer">
                  <Image
                    src={isLiked ? "/assets/heart-filled.svg" : "/assets/heart.svg"}
                    alt="heart"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <span className="text-white text-small-regular">
                    {likes.length}
                  </span>
                </div>

                {/* Reply */}
                <Link href={`/knit/${id}`} className="flex items-center gap-1">
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                  {comments.length > 0 && (
                    <span className="text-gray-400 text-small-regular">
                      {comments.length}
                    </span>
                  )}
                </Link>

                {/* Repost */}
                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />

                {/* Share */}
                <Image
                  src="/assets/share.svg"
                  alt="share"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>

              {/* Replies link */}
              {isComment && comments.length > 0 && (
                <Link href={`/knit/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default KnitCard;
