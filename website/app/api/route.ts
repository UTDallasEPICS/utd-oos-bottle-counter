import type { NextApiRequest, NextApiResponse } from 'next'   
import { NextResponse } from 'next/server'
 


type ResponseData = {
  message: string
}

export function GET(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === 'GET') {
    console.log("This works!!!!")
    return NextResponse.json({ response: 'WOAHHHHH' }, { status: 465 })
} else {
    return res.status(400).json({ message: 'reCAPTCHA verification failed' })
  }
}

export function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    console.log("Post!!!!")
} else {
    return res.status(400).json({ message: 'reCAPTCHA verification failed' })
  }
}

