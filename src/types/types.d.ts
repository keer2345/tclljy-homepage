declare namespace API {
  type RespResult = {
    code?: string
    msg?: string
    data?: any
    requestId?: string
    success?: boolean
  }
  type PageParams = {
    current?: number
    // currentPage?: number;
    pageSize?: number
  }
}
