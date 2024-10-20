// import { InAppPurchases } from '@nativescript/in-app-purchase';

// export const initializePayments = async () => {
//   await InAppPurchases.init();
// };

// export const purchasePremium = async () => {
//   const products = await InAppPurchases.getProducts(['premium_subscription']);
//   if (products.length > 0) {
//     const result = await InAppPurchases.buyProduct(
//       products[0].productIdentifier
//     );
//     return result.transactionState === 'Purchased';
//   }
//   return false;
// };

// export const restorePurchases = async () => {
//   const restoredPurchases = await InAppPurchases.restorePurchases();
//   return restoredPurchases.some(
//     (purchase) => purchase.productIdentifier === 'premium_subscription'
//   );
// };
