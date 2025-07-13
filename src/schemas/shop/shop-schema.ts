import { z } from 'zod';

export const MAX_FILE_SIZE = 5000000;
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export const ShopSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length === 1, 'Hình là bắt buộc.')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, 'Tệp tối đa là 5MB.')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png và .webp là định dạng cho phép.'
    )
    .optional(),
  name: z.string().min(2, {
    message: 'Tên gian hàng phải có ít nhất 2 ký tự.'
  }),
  description: z.string().min(2, {
    message: 'Mô tả phải có ít nhất 2 ký tự.'
  }),
  productType: z.string().min(2, 'Loại sản phẩm là bắt buộc'),
  category: z.string().min(1, 'Danh mục là bắt buộc'),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional()
});
