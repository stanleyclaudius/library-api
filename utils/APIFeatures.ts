export function APIFeatures(this: any, query: object, queryStr: object) {
  this.query = query
  this.queryStr = queryStr

  this.paginate = () => {
    const page = this.queryStr.page || 1
    const limit = this.queryStr.limit || 2
    const skip = (page - 1) * limit
    this.query = this.query.limit(limit).skip(skip)
    return this
  }

  this.sort = () => {
    const sort = this.queryStr.sort || '-createdAt'
    this.query = this.query.sort(sort)
    return this
  }
} 