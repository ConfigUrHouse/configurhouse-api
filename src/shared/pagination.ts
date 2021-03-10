export function getPagingData<T>(
  data: { count: number; rows: T[] },
  page: number,
  limit?: number
): { totalItems: number; items: T[]; totalPages: number; currentPage: number } {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / (limit || totalItems));

  return { totalItems, items, totalPages, currentPage };
}

export const getPagination = (page: number, size: number) => {
  const limit = size ? +size : undefined;
  const offset = page && limit ? page * limit : 0;

  return { limit, offset };
};
