type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 1) return pages;

    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = generatePageNumbers();
  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
        disabled={currentPage === 1 || totalPages === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          className={`px-3 py-1 text-sm font-medium rounded-md hover:bg-gray-300 ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} ${
            typeof page === 'string' ? 'cursor-default' : ''
          }`}
          disabled={typeof page === 'string'}
          onClick={() => typeof page === 'number' && onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
