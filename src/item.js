class Item {
  constructor(itemId, productName, quantity, price) {
    this._itemId = itemId;
    this._productName = productName;
    this._quantity = quantity;
    this._price = price;
  }

  get quantity() {
    return this._quantity;
  }

  get itemId() {
    return this._itemId;
  }

  get productName() {
    return this._productName;
  }

  get price() {
    return this._price;
  }

  totalPrice() {
    return this._price * this._quantity;
  }
}

export default Item;
