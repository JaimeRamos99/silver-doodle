export type PaginationParams = {
  limit: number;
  offset: number;
};

export const calculatePaginationParams = (
  page: string,
  count: string
): PaginationParams => {
  const requestedPage = parseInt(page) || 1;
  const itemsCount = parseInt(count) || 20;
  return {
    limit: itemsCount,
    offset: (requestedPage - 1) * itemsCount,
  };
};
