"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import * as z from "zod";
import { Button } from "@/components/ui/button";
import Tiptap from "@/components/Tiptap";

export default function Home() {
  const formSchema = z.object({
    title: z
      .string()
      .min(5, { message: "Hey the title is not long Enough" })
      .max(100, { message: "Hey the title is too long" }),
    price: z.number().min(5, { message: "Hey the title is not long Enough" }),
    description: z
      .string()
      .min(1, { message: "Hey the title is not long Enough" })
      .max(99999, { message: "Hey the title is too long" })
      .trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      price: 29.99,
      description: "",
    },
  });

  function onSubmit(values : z.infer<typeof formSchema>){
    //do somethin with form values 
    //this will be type-safe and validated 
  }

  return (
    <>
      <main className="p-24">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Main title for your Product"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                   <Tiptap description={field.name} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="my-4" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </main>
    </>
  );
}
