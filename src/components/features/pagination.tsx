interface Props {
  currentPage: number;
  changePage: (newPage: number) => void;
  totalPage: number;
}

export function BtnPagination({ changePage, currentPage, totalPage }: Props) {
  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Anterior
      </button>

      {Array.from({ length: totalPage }, (_, i) => i + 1)
        .slice(
          Math.max(0, currentPage - 3),
          Math.min(totalPage, currentPage + 2)
        )
        .map((page) => (
          <button
            key={page}
            onClick={() => changePage(page)}
            className={`px-4 py-2 rounded-md ${
              currentPage === page
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-300"
            } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {page}
          </button>
        ))}

      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPage}
        className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Siguiente
      </button>
    </div>
  );
}
