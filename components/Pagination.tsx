import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/20/solid";
import { FC, ReactElement, memo, useMemo } from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const Pagination: FC<PaginationProps> = (props): ReactElement => {
  const { currentPage, totalPages, onChange } = props;

  const range = (start: number, end: number) => {
    let length = end - start + 1;
    let range = Array.from(Array(length).keys()).map((x) => x + start);
    return range;
  };

  const paginationRange = useMemo(() => {
    const totalPageNumbers = 5;
    const siblingCount = 2;
    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 0);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const isMaxLeft = leftSiblingIndex > 0;
    const isMaxRight = rightSiblingIndex < totalPages - siblingCount;

    if (!isMaxLeft && isMaxRight) {
      let leftItemCount = 1 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange];
    }

    if (isMaxLeft && !isMaxRight) {
      let rightItemCount = 1 + 2 * siblingCount;
      let rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [...rightRange];
    }

    if (isMaxLeft && isMaxRight) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [...middleRange];
    }
  }, [totalPages, currentPage]);

  return (
    <div className="flex items-center justify-between px-4 py-3 ">
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white outline outline-1  p-2">
          <nav
            className="isolate inline-flex items-center space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              className="relative inline-flex rounded-sm items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-indigo-200 focus:z-20 focus:outline-offset-0"
              onClick={() => onChange(1)}
            >
              <ChevronDoubleLeftIcon
                className="h-5 w-5"
                aria-hidden="true"
                aria-label="Previous"
                data-testid="button-previous"
              />
            </div>

            {paginationRange?.map((item, _) => {
              return (
                <div
                  key={item}
                  aria-current="page"
                  role="button"
                  className={`${
                    item === currentPage
                      ? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-indigo-200 focus:outline-offset-0"
                  } relative inline-flex items-center rounded-sm px-4 py-2 text-sm font-semibold`}
                  onClick={() => onChange(item)}
                >
                  <p>{item}</p>
                </div>
              );
            })}
            <div
              className="relative inline-flex items-center rounded-sm px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-indigo-200 focus:z-20 focus:outline-offset-0"
              onClick={() => onChange(totalPages)}
            >
              <ChevronDoubleRightIcon
                className="h-5 w-5"
                aria-hidden="true"
                aria-label="Next"
                data-testid="button-next"
              />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default memo(Pagination);
