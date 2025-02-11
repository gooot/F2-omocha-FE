import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';

import useSetSearchParams from '@/hooks/useSetSearchParam';

import * as S from './Pagination.css';

interface PaginationProps {
  lastPage: number;
}

const NUM = 5;
const FIRST_PAGE = 1;

function Pagination({ pageInfo }: { pageInfo: PaginationProps }) {
  const { lastPage } = pageInfo;
  const { searchParams, setSingleSearchParam } = useSetSearchParams();
  const currentPage = Number(searchParams.get('page'));

  const handlePageChange = (newPage: number) => {
    setSingleSearchParam('page', newPage.toString());
  };

  const half = Math.floor(NUM / 2);
  const startPage = Math.max(1, Math.min(currentPage - half, lastPage - NUM + 1));
  const endPage = Math.min(lastPage, startPage + NUM - 1);

  const numberStyle = (page: number) => {
    return currentPage === page ? S.base.currentNumbers : S.base.numbers;
  };

  const chevronStyle = (page: number) => {
    if (page === currentPage) {
      return S.base.numbers;
    }
    return S.base.currentNumbers;
  };

  return (
    <div className={S.pagination}>
      <div className={S.chevronButton}>
        {/* 첫 페이지로 이동 */}
        <button
          className={chevronStyle(1)}
          type="button"
          onClick={() => handlePageChange(FIRST_PAGE)}
          disabled={currentPage === FIRST_PAGE}
        >
          <ChevronsLeftIcon size={20} />
        </button>
        {/* 다음 페이지로 이동 */}
        <button
          className={chevronStyle(1)}
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === FIRST_PAGE}
        >
          <ChevronLeftIcon size={20} />
        </button>
      </div>
      <div className={S.numberButtons}>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(
          page => (
            <button
              type="button"
              key={page}
              onClick={() => handlePageChange(page)}
              className={`${S.numberButtons} ${numberStyle(page)}`}
            >
              {page}
            </button>
          ),
        )}
      </div>
      <div className={S.chevronButton}>
        {/* 이전 페이지로 이동 */}
        <button
          className={chevronStyle(lastPage)}
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === lastPage}
        >
          <ChevronRightIcon size={20} />
        </button>
        {/* 마지막 페이지로 이동 */}
        <button
          className={chevronStyle(lastPage)}
          type="button"
          onClick={() => handlePageChange(lastPage)}
          disabled={currentPage === lastPage}
        >
          <ChevronsRightIcon size={20} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
