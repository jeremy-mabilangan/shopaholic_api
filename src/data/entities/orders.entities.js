export class OrderEntities {
  constructor(_id, user_id, status, total_amount, items) {
    this.id = _id;
    this.user_id = user_id;
    this.status = status;
    this.total_amount = total_amount;
    this.items = items;
  }
}
