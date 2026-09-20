interface Props<T> {
  success?: boolean;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  data: T[] | undefined | null;
  empty: {
    title: string;
    message: string;
  };
  render: (data: T[]) => React.ReactNode;
}

const DataRenderer = <T,>({
  success,
  error,
  data,
  empty,
  render,
}: Props<T>) => {
  if (!success) {
    return (
      <div className="flex w-full flex-col items-center justify-center py-10">
        <p className="text-base font-semibold text-dark-400 dark:text-light-800">
          {error?.message || "Something went wrong"}
        </p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center py-10 text-center">
        <p className="text-base font-semibold text-dark-400 dark:text-light-800">
          {empty.title}
        </p>
        <p className="mt-2 text-sm text-dark-500 dark:text-light-400">
          {empty.message}
        </p>
      </div>
    );
  }

  return render(data);
};

export default DataRenderer;
