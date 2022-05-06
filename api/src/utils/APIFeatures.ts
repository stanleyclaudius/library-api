class APIFeatures {
  query: object
  queryStr: object
  
  constructor(query: object, queryStr: object) {
    this.query = query
    this.queryStr = queryStr
  }

  paginate() {
    // @ts-ignore
    const page = this.queryStr.page || 1
    // @ts-ignore
    const limit = this.queryStr.limit || 2
    const skip = (page - 1) * limit
    // @ts-ignore
    this.query = this.query.limit(limit).skip(skip)
    return this
  }

  sort() {
    // @ts-ignore
    const sort = this.queryStr.sort || '-createdAt'
    // @ts-ignore
    this.query = this.query.sort(sort)
    return this
  }
}

export default APIFeatures