/**
 * Filter the results by query
 *
 * @param name Name to filter
 * @param dataArray The array we're using to filter
 * @returns Returns the list filtered
 */
export const filterByQuery = (query: string, dataArray: any[]) => {
  return dataArray.filter((item) => {
    const byName = item.name?.toLowerCase().includes(query.toLowerCase());
    const byCity = item.city?.toLowerCase().includes(query.toLowerCase());
    const byCountry = item.country?.toLowerCase().includes(query.toLowerCase());
    const byFavouriteSport = item.favorite_sport
      ?.toLowerCase()
      .includes(query.toLowerCase());
    return byName || byCity || byCountry || byFavouriteSport;
  });
};
