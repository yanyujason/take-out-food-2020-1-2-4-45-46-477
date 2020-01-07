import loadAllItems from "./items";
import loadPromotions from "./promotions";
import Item from "./item";

export function bestCharge(selectedItems) {
  const items = loadAllItems();
  const allSelectedItems = selectedItems.map((item) => {
    const [itemId, quantity] = item.split(" x ");
    const productOnList = items.find((storedItem) => storedItem.id === itemId);

    return new Item(itemId,
      productOnList.name,
      quantity,
      productOnList.price,
      loadPromotions()[1].items.includes(itemId));
  });

  return printReceipt(allSelectedItems);
}

function printReceipt(allSelectedItems) {
  const orderDetails = allSelectedItems.map((item) => {
    return `${item.productName} x ${item.quantity} = ${item.totalPrice()}元`
  }).join("\n");
  const {realPrice, message} = calculatePrice(allSelectedItems);

  return `
============= 订餐明细 =============
${orderDetails}
${message}
总计：${realPrice}元
===================================
`;
}

function calculatePrice(allSelectedItems) {
  let totalPrice = allSelectedItems.reduce((total, item) => total + item.totalPrice(), 0);
  let {discountMessage, extraDiscountPrice} = calculateMoneyOff(totalPrice);
  let {priceAfterDiscount, halfPriceDiscountMessage} = calculateRateDiscount(allSelectedItems, totalPrice);

  let realPrice = extraDiscountPrice;
  let printMessage  = discountMessage;

  if (extraDiscountPrice > priceAfterDiscount) {
    realPrice = priceAfterDiscount;
    printMessage = halfPriceDiscountMessage;
  }

  let message = '-----------------------------------';
  if (totalPrice !== realPrice) {
    message += `
使用优惠:
${printMessage}
-----------------------------------`;
  }

  return {realPrice, message};
}

function calculateMoneyOff(totalPrice) {
  let discountMessage = '';
  let extraDiscountPrice = totalPrice;
  if (totalPrice > 30) {
    extraDiscountPrice = totalPrice - 6;
    discountMessage = '满30减6元，省6元';
  }
  return {extraDiscountPrice, discountMessage};
}

function calculateRateDiscount(allSelectedItems, totalPrice) {
  const halfPricedProducts = allSelectedItems.filter((item) => item.isSpecial);
  const totalDiscount = halfPricedProducts.reduce((discount, product) => discount + product.discountPrice(), 0);
  const halfPriedProductsName = halfPricedProducts.map((item) => item.productName).join('，');

  const halfPriceDiscountMessage = `指定菜品半价(${halfPriedProductsName})，省${totalDiscount}元`;
  const priceAfterDiscount = totalPrice - totalDiscount;

  return {priceAfterDiscount, halfPriceDiscountMessage};
}
