
export type OrderDataType = {
    content: OrderResponseType[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        sort: [];
        unpaged: boolean;
    };
    size: number;
    sort: [];
    totalElements: number;
    totalPages: number;
};
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
    orderItems: []

}