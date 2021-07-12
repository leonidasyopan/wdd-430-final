export class Product {
  constructor (
    public id: string,
    public name: string,
    public description: string,
    public quantity: number,
    public expectedPrice: number,
    public actualPrice: number,
  ) { }
}
