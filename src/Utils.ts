import { MainPageQuery_category_products_prices as MainPageQueryCategoryProductsPrices } from './graphql/__generated__/MainPageQuery';

export const getPrice = (prices: MainPageQueryCategoryProductsPrices[] | [], currency: string) => {
  for (let i = 0; i < prices.length; i++) {
    if (prices[i]?.currency === currency) {
      return prices[i].amount;
    }
  }
  return null;
};
