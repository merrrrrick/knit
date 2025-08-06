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
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePathname, useRouter } from "next/navigation";

import { KnitValidation } from "@/lib/validations/knit";
import { createKnit } from "@/lib/actions/knit.actions";
// import { updateUser } from "@/lib/actions/user.actions";
interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

const PostKnit = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(KnitValidation),
    defaultValues: {
      knit: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof KnitValidation>) => {
    await createKnit({
      text: values.knit,
      author: userId,
      communityId: null,
      path: pathname,
    });
    router.push('/')
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex flex-col justify-start gap-10 "
      >
        <FormField
          control={form.control}
          name="knit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={20} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-purple-500 hover:bg-white hover:text-black cursor-pointer"
        >
          Post Knit
        </Button>
      </form>
    </Form>
  );
};

export default PostKnit;
