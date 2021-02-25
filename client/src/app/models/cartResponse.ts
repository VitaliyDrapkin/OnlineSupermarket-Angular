export interface lastCartInfoResponse {
  lastCartInfo: {
    isExist: boolean;
    id: number;
    isFill: boolean;
    totalPrice: number;
    createDate: Date;
  };
  lastPurchaseInfo: {
    isExist: boolean;
    datePurchase: Date;
    totalPrice: number;
  };
}
