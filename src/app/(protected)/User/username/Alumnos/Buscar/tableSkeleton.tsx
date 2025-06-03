export const TableSkeleton = () => {
  return (
    <div className="p-6  mt-6 max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
      {/* Skeleton para la barra de búsqueda */}
      <div className="mb-6">
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      {/* Skeleton para los controles de paginación */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      {/* Skeleton para la tabla */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[...Array(7)].map((_, i) => (
                <th key={i} className="px-6 py-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(5)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                {[...Array(7)].map((_, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Skeleton para la paginación */}
      <div className="flex justify-center mt-6 space-x-2">
        <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-10 w-10 bg-gray-200 rounded-md animate-pulse"
          ></div>
        ))}
        <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};
