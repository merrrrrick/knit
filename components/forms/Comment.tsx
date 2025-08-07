"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePathname, useRouter } from "next/navigation";
import { CommentValidation } from "@/lib/validations/knit";
import Image from "next/image";
import { addCommentToKnit } from "@/lib/actions/knit.actions";
// import { createKnit } from "@/lib/actions/knit.actions";

interface Props {
  knitId: string;
  currentUserImg: string;
  currentUserId: string;
}
const Comment = ({ knitId, currentUserImg, currentUserId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      knit: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToKnit(
      knitId,
      values.knit,
      JSON.parse(currentUserId),
      pathname
    );

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex items-center gap-4 border-y border-y-dark-4 py-5 max-xs:flex-col !important"
      >
        <FormField
          control={form.control}
          name="knit"
          render={({ field }) => (
            <FormItem className="flex w-full gap-3 items-center">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="Profile Image"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="Comment..."
                  className="no-focus text-white outline-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="rounded-3xl bg-purple-500 px-8 py-2 hover:bg-white hover:text-black !text-small-regular text-white max-xs:w-full !important"
        >
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
