import z from 'zod';
export const OrderDataValidation = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});
