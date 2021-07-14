export class Product {
  constructor (
    public id: string,
    public name: string,
    public description: string,
    public quantity: string,
    public expectedPrice: string,
    public actualPrice: string,
  ) { }
}
