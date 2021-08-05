const paginator = (items, currentPage, limit) => {
  const totalPages = Math.ceil(items.length / limit)

  let offset = 0
  let actualPage = 1

  if (currentPage <= totalPages) {
    offset = (currentPage - 1) * limit
    actualPage = currentPage
  }

  const paginatedItems = items.slice(offset).slice(0, limit)

  return {
    currentPage: actualPage,
    limit,
    prePage: currentPage - 1 ? currentPage - 1 : null,
    nextPage: totalPages > currentPage ? currentPage + 1 : null,
    total: items.length,
    totalPages,
    data: paginatedItems,
  }
}

export default paginator
