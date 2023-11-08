import { NextResponse } from 'next/server'

import { countRecord, fetchRecords, queryRecords } from '@/lib/server/db'

// without query embeddings
export async function GET(request: Request, { params }: { params: { collectionName: string } }) {
  const connectionString = extractConnectionString(request)
  const page = extractPage(request)

  const data = await fetchRecords(connectionString, params.collectionName, page)
  const totalCount = await countRecord(connectionString, params.collectionName)

  return NextResponse.json({
    total: totalCount,
    page: page,
    records: data,
  })
}

// with query embeddings
export async function POST(request: Request, { params }: { params: { collectionName: string } }) {
  const connectionString = extractConnectionString(request)
  const query = await extractQuery(request)
  const embeddingUrl = extractEmbeddingUrl(request)
  console.log(embeddingUrl, connectionString, query)
  try {
    const queryEmbeddings = await getEmbeddingDimension(embeddingUrl, query.toString())
    const data = await queryRecords(connectionString, params.collectionName, queryEmbeddings)

    return NextResponse.json({
      records: data,
    })
  } catch (error: any) {
    if ((error as Error).message === 'InvalidDimension') {
      return NextResponse.json({
        error:
          'Invalid dimension for query embeddings. Please provide embeddings with the same dimension as the collection.',
      })
    } else {
      console.log(error)
      return NextResponse.json({
        error: (error as Error).message,
      })
    }
  }
}

function extractConnectionString(request: Request) {
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  return searchParams.get('connectionString') || ''
}

function extractEmbeddingUrl(request: Request) {
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  return searchParams.get('embeddingUrl') || ''
}

function extractPage(request: Request) {
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  return parseInt(searchParams.get('page') || '1', 10)
}

async function extractQuery(request: Request) {
  const res = await request.json()
  return res.query
}

// async function extractQuery(request: Request) {
//   const res = await request.json()
//   return res.query!.split(',').map((item: string) => parseFloat(item))
// }

async function getEmbeddingDimension(embeddingUrl: string, query: string) {
  // post request to embeddingUrl with query and return the dimension
  const res = await fetch(embeddingUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: query, embedding_model: 'dashscope' }),
  })
  console.log(res.ok, res.status, res.statusText)
  const data = await res.json()
  return data.data
}
