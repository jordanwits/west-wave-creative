"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { checkAuth, login } from "@/lib/auth"
import { Lock } from "lucide-react"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if already authenticated
    checkAuth().then((authenticated) => {
      if (authenticated) {
        router.push("/forms")
      } else {
        setIsChecking(false)
      }
    })
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const result = await login(password)
    
    if (result.success) {
      router.push("/forms")
    } else {
      setError(result.error || "Invalid password")
      setIsLoading(false)
    }
  }

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#F5F3F4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
          <p className="font-sans text-[#3A506B]">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F3F4] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border-2 border-[#D4AF37]/30 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
            <Lock className="h-8 w-8 text-[#D4AF37]" />
          </div>
          <CardTitle className="font-serif text-3xl text-[#0B132B]">
            Admin Login
          </CardTitle>
          <CardDescription className="font-sans text-[#3A506B]">
            Enter your password to access the form builder
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="font-sans text-sm font-semibold text-[#0B132B]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                disabled={isLoading}
                className="border-2 border-[#3A506B]/20 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 h-12 rounded-lg bg-white/80 backdrop-blur-sm"
                autoFocus
              />
            </div>
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-600 font-sans">{error}</p>
              </div>
            )}
            <Button
              type="submit"
              disabled={isLoading || !password}
              className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0B132B] font-semibold h-12"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

