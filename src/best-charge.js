import loadAllItems from "./items";
import Item from "./item";

export function bestCharge(selectedItems) {
  const items = loadAllItems();
  const allSelectedItems = selectedItems.map((item) => {
    const [itemId, quantity] = item.split(" x ");
    const productOnList = items.find((storedItem) => storedItem.id === itemId);

    return new Item(itemId, productOnList.name, quantity, productOnList.price);
  });

  return printReceipt(allSelectedItems);
}

function printReceipt(allSelectedItems) {
  const orderDetails = allSelectedItems.map((item) => {
    return `${item.productName} x ${item.quantity} = ${item.totalPrice()}元`
  }).join("\n");

  return `
  ============= 订餐明细 =============
  ${orderDetails}
  ===================================
  `;
}
