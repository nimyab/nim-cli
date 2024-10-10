import { z } from 'zod';

export const IdSchema = z.coerce.string();
export const TakeSchema = z.coerce.number().nonnegative();
export const SkipSchema = z.coerce.number().nonnegative();
export const SlugSchema = z.string();
export const FileTypeSchema = z.enum(['images', 'video', 'documents']);
export const EmailSchema = z.string().email();
export const PhoneSchema = z.string().max(10);
export const DateSchema = z.coerce.date();

export type Id = z.infer<typeof IdSchema>;
export type Take = z.infer<typeof TakeSchema>;
export type Skip = z.infer<typeof SkipSchema>;
export type Slug = z.infer<typeof SlugSchema>;
export type FileType = z.infer<typeof FileTypeSchema>;
export type Email = z.infer<typeof EmailSchema>;
export type Phone = z.infer<typeof PhoneSchema>;
