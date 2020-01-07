class Item {
  constructor(itemId, productName, quantity, price, isSpecial) {
    this._itemId = itemId;
    this._productName = productName;
    this._quantity = quantity;
    this._price = price;
    this._isSpecial = isSpecial;
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

  get isSpecial() {
    return this._isSpecial;
  }

  totalPrice() {
    return this._price * this._quantity;
  }

  totalDiscount() {
    return this.totalPrice() * .5;
  }
}

export default Item;
