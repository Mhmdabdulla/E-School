import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "../ui/pagination"
  
  interface CoursePaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
  }
  
  export function GenericPagination({ currentPage, totalPages, onPageChange }: CoursePaginationProps) {
    const getPageNumbers = () => {
      const pages = []
  
      pages.push(1)
  
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        if (pages[pages.length - 1] !== i - 1) {
          pages.push(-1) 
        }
        pages.push(i)
      }
  
      if (totalPages > 1) {
        if (pages[pages.length - 1] !== totalPages - 1) {
          pages.push(-1) 
        }
        pages.push(totalPages)
      }
  
      return pages
    }
  
    const pageNumbers = getPageNumbers()
  
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage > 1) onPageChange(currentPage - 1)
              }}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
  
          {pageNumbers.map((page, i) =>
            page === -1 ? (
              <PaginationItem key={`ellipsis-${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange(page)
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
  
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage < totalPages) onPageChange(currentPage + 1)
              }}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
  