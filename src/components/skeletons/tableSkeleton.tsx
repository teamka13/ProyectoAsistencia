import React from "react";

interface TableSkeletonProps {
  columns?: number;
  rows?: number;
  className?: string;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
  columns = 8,
  rows = 10,
  className = "",
}) => {
  return (
    <div
      className={`overflow-x-auto border border-gray-200 rounded-lg animate-pulse ${className}`}
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-300">
          <tr>
            {[...Array(columns)].map((_, i) => (
              <th
                key={`skeleton-header-${i}`}
                className="px-6 py-3 text-left text-sm font-semibold text-transparent uppercase tracking-wider w-48"
              >
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={`skeleton-row-${rowIndex}`}>
              {[...Array(columns)].map((_, cellIndex) => (
                <td
                  key={`skeleton-cell-${rowIndex}-${cellIndex}`}
                  className="px-6 py-4 whitespace-nowrap"
                >
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
