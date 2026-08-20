function Pagination({
  offset,
  limit,
  total,
  onPageChange,
}) {
  const currentPage =
    Math.floor(offset / limit) + 1;

  const totalPages =
    Math.ceil(total / limit);

  if (totalPages <= 1) {
    return null;
  }

  const goToPage = (page) => {
    const newOffset = (page - 1) * limit;

    onPageChange(newOffset);
  };

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() =>
          goToPage(currentPage - 1)
        }
      >
        Previous
      </button>

      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((page) => (
        <button
          key={page}
          className={
            page === currentPage
              ? "active-page"
              : ""
          }
          onClick={() => goToPage(page)}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() =>
          goToPage(currentPage + 1)
        }
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;