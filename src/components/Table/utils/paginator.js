const paginator = (items, currentPage, limit) => {
  const offset = (currentPage - 1) * limit

  const paginatedItems = items.slice(offset).slice(0, limit)
  // const totalPages = Math.ceil(items.length / limit)

  return paginatedItems

  // return {
  //   currentPage,
  //   limit,
  //   pre_page: currentPage - 1 ? currentPage - 1 : null,
  //   next_page: totalPages > currentPage ? currentPage + 1 : null,
  //   total: items.length,
  //   totalPages,
  //   data: paginatedItems,
  // }
}

export default paginator
