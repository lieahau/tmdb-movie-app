interface StatusMessageProps {
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  noData?: boolean;
};

export const StatusMessage = ({ loading, error, onRetry, noData }: StatusMessageProps) => {
  if (loading) return <p className="mt-4 text-center">Loading...</p>;
  if (noData) return <p className="mt-4 text-center">No movies found.</p>;
  if (error)
    return (
      <div className="mt-4 text-center">
        <p>{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 px-3 py-1 bg-gray-800 text-white rounded"
          >
            Retry
          </button>
        )}
      </div>
    );
  return null;
};
