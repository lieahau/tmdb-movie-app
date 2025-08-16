import { useEffect } from "react";

type Options = {
  loading: boolean;
  hasMore?: boolean;
  onLoadMore: () => void;
  offset?: number;
};

export const useInfiniteScroll = ({
  loading,
  onLoadMore,
  hasMore = true,
  offset = 200,
}: Options) => {
  useEffect(() => {
    if (!hasMore) return;

    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - offset;

      if (isBottom && !loading) {
        onLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, onLoadMore, hasMore, offset]);
};
