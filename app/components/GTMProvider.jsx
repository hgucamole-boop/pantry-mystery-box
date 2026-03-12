"use client"
import { useEffect } from "react"
import { getGTM } from "@/lib/gtm" // wherever your getGTM lives

export default function GTMProvider({ children }) {
  useEffect(() => {
    getGTM()
  }, [])

  return <>{children}</>
}