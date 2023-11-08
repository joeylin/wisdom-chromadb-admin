export type AppConfig = {
  connectionString: string
  embeddingUrl: string
  currentCollection: string
}

export type Collection = {
  id: string
  name: string
}

export type Record = {
  id: string
  document: string
  metadata: { source: string }
  embedding: number[]
  distance: number
}

export type RecordsPage = {
  total: number
  page: number
  records: Record[]
}

export type ErrorResponse = {
  error: string
}

export type QueryResult = RecordsPage | ErrorResponse
