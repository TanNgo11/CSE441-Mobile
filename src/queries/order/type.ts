import { z } from "zod";

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  SHIPPING = "SHIPPING",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

export interface Order {
  customerName: string;
  createdDate: Date;
  email: string;
  phoneNumber: string;
  address: string;
  note: string;
  totalPay: number;
  orderItems?: OrderItem[];
  status?: OrderStatus;
}

export interface OrderItem {
  productName: string;
  productId: number;
  image: string;
  quantity: number;
  price: number;
}

export const OrderItemSchema = z.object({
  productId: z.number().min(1),
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
  price: z.number().min(0, { message: "Price must be a non-negative number" }),
});

export const OrderSchema = z.object({
  customerName: z
    .string()
    .min(1, { message: "Customer name must not be empty" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits long" })
    .regex(/^[0-9]+$/, { message: "Phone number must contain only digits" }),
  address: z.string().min(1, { message: "Address must not be empty" }),
  note: z.string().optional(),
  couponCode: z.string().optional(),
  orderItems: z.array(OrderItemSchema),
});

export type OrderRequest = z.infer<typeof OrderSchema>;
