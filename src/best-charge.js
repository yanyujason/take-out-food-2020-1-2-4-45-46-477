import loadAllItems from "./items";
import loadPromotions from "./promotions";
import Item from "./item";

export function bestCharge(selectedItems) {
  const items = loadAllItems();
  const specials = loadPromotions()[1].items;
  const allSelectedItems = selectedItems.map((item) => {
    const [itemId, quantity] = item.split(" x ");
    const productOnList = items.find((storedItem) => storedItem.id === itemId);

    return new Item(itemId,
      productOnList.name,
      quantity,
      productOnList.price,
      specials.includes(itemId));
  });

  return printReceipt(allSelectedItems);
}

function printReceipt(allSelectedItems) {
  const orderDetails = allSelectedItems.map((item) => {
    return `${item.productName} x ${item.quantity} = ${item.totalPrice()}元`
  }).join("\n");

  const halfPricedProducts = allSelectedItems
    .filter((item) => item.isSpecial);

  const halfPriedProductsName = halfPricedProducts
    .map((item) => item.productName).join('，');

  const totalDiscount = halfPricedProducts
    .reduce((totalPrice, product) => totalPrice + product.totalDiscount(), 0);

  let totalPrice = allSelectedItems.reduce((total, item) => total + item.totalPrice(), 0);
  let extraDiscountPrice = totalPrice;
  let discountMessage = '';
  if (totalPrice > 30) {
    extraDiscountPrice = totalPrice - 6;
    discountMessage = '满30减6元，省6元';
  }

  let realPrice = extraDiscountPrice;
  let priceAfterDiscount = totalPrice - totalDiscount;
  if (extraDiscountPrice > priceAfterDiscount) {
    realPrice = priceAfterDiscount;
    discountMessage = `指定菜品半价(${halfPriedProductsName})，省${totalDiscount}元`
  }

  let message = '-----------------------------------';
  if (totalPrice !== realPrice) {
    message += `
使用优惠:
${discountMessage}
-----------------------------------`;
  }

  return `
============= 订餐明细 =============
${orderDetails}
${message}
总计：${realPrice}元
===================================
`;
}
