"use client";

import React, { useState } from "react";
import { Card } from "./ui/card";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./ui/field";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { Button } from "./ui/button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { subjects } from "@/constants";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "./ui/input-group";
import { createCompanion } from "@/lib/actions/companion.actions";
import { redirect } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, "Comapnion is required"),
  subject: z.string().min(1, "Subject is required"),
  topic: z
    .string()
    .min(1, "Topic is required.")
    .max(300, "Topic must be at most 300 characters"),
  voice: z.string().min(1, "Voice is required."),
  style: z.string().min(1, "Style is required."),
  duration: z.number().min(1, "Duration is required"),
});

const CompanionsForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });

    const companion = await createCompanion(data);

    if (companion) {
      redirect(`/companions/${companion.id}`);
    } else {
      console.log("Failed to create a companion");
      toast("Failed to create a companion", {
        position: "top-right",
        classNames: {
          content: "bg-red-700 text-gray-200",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      });
      redirect("/");
    }
  }

  return (
    <Card className="w-full sm:max-w-md p-4 flex  justify-center bg-chart-5  rounded-md border-gray-400 border-2 text-gray-200">
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-name">Companion name</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter the companion name"
                  className="border-gray-500 rounded-md "
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="subject"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field orientation="responsive" data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="form-rhf-select-subject">
                    Subject
                  </FieldLabel>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className=" capitalize  border-gray-500 rounded-md">
                    <SelectValue placeholder="Select the subject" />
                  </SelectTrigger>
                  <SelectContent
                    position="item-aligned"
                    className="bg-chart-4 text-gray-200 rounded-md "
                  >
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectSeparator />
                    {subjects.map((subject) => (
                      <SelectItem
                        value={subject}
                        key={subject}
                        className="capitalize"
                      >
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <Controller
            name="topic"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-textarea-about">
                  What should the companion help with?
                </FieldLabel>
                {/* <Textarea
                    
                    {...field}
                    id="form-rhf-textarea-about"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ex. Derivates & Integrals"
                    className="min-h-30"
                  /> */}
                <InputGroup className="rounded-md border-gray-500">
                  <InputGroupTextarea
                    {...field}
                    id="form-rhf-demo-description"
                    placeholder="Ex. Derivates & Integrals"
                    rows={6}
                    className="min-h-24 resize-none "
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.value.length}/300 characters
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="voice"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field orientation="responsive" data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="form-rhf-select-voice">Voice</FieldLabel>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="rounded-md border-gray-500">
                    <SelectValue placeholder="Select the voice" />
                  </SelectTrigger>
                  <SelectContent
                    position="item-aligned"
                    className="bg-chart-4 text-gray-200 rounded-md "
                  >
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <Controller
            name="style"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field orientation="responsive" data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="form-rhf-select-style">Style</FieldLabel>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="rounded-md border-gray-500">
                    <SelectValue placeholder="Select the style" />
                  </SelectTrigger>
                  <SelectContent
                    position="item-aligned"
                    className="bg-chart-4 text-gray-200 rounded-md "
                  >
                    <SelectItem value="formal">Fomral</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <Controller
            name="duration"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-duration">
                  Estimated session duration in minutes
                </FieldLabel>
                <Input
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  type="number"
                  placeholder="15"
                  className="rounded-md border-gray-500"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button type="submit" className="w-full cursor-pointer">
            Build Your Companion
          </Button>
        </FieldGroup>
      </form>
    </Card>
  );
};

export default CompanionsForm;
