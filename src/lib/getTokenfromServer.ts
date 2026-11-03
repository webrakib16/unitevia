import { headers } from "next/headers"
import { auth } from "@/lib/auth"


export const getTokenfromServer = async() => {
    const jwtToken = await auth.api.getToken({
    headers: await headers()
  })
  console.log(jwtToken?.token)
  const token = jwtToken?.token
  return token;
}