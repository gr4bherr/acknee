export class Paginated<T> {
  limit: number
  page: number
  total: number
  data: T[]

  constructor(limit: number, page: number, total: number, data: T[]) {
    this.limit = limit
    this.page = page
    this.total = total
    this.data = data
  }
}

export class PaginatedDto<T> {
  currentPage: number
  totalPages: number
  isPrev: boolean
  isNext: boolean
  total: number
  nodes: T[]

  constructor(paginated: Paginated<any>, nodes: T[]) {
    this.currentPage = paginated.page
    this.totalPages = Math.ceil(paginated.total / paginated.limit)
    this.isPrev = this.currentPage > 1
    this.isNext = this.currentPage < this.totalPages

    this.total = paginated.total
    this.nodes = nodes
  }
}
