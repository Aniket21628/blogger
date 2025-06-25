import z from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    name: z.string().optional(),
});

export type SignupType = z.infer<typeof signupInput>;

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type SigninType = z.infer<typeof signinInput>;

export const createPostInput = z.object({
    title: z.string(),
    content: z.string(),
    published: z.boolean().optional(),
});

export type CreatePostType = z.infer<typeof createPostInput>;

export const updatePostInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string(),
	published: z.boolean(),
});

export type UpdatePostType = z.infer<typeof updatePostInput>;

export const updateUserDetailsInput = z.object({
	name: z.string().optional(),
	password: z.string().min(6).optional(),
});

export type UpdateUserDetailsInput = z.infer<typeof updateUserDetailsInput>;