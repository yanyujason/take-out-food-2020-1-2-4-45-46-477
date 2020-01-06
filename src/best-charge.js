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
    .map((item) => item.productName).join(', ');

  const totalDiscountPrice = halfPricedProducts
    .reduce((totalPrice, product) => totalPrice + product.totalDiscountPrice(), 0);

  return `
  ============= 订餐明细 =============
  ${orderDetails}
  -----------------------------------
  使用优惠:
  指定菜品半价(${halfPriedProductsName}), 省${totalDiscountPrice}元
  ===================================
  `;
}
