export interface OrderResponseType {
    id: number;
    createdDate: string;
    customerName: string;
    email: string;
    phoneNumber: string;
    address: string;
    totalPay: number;
    note: string;
    coupon: string;
    slug: string;
    ratings: number;
    productStatus: string;
    orderItems:  []

 }