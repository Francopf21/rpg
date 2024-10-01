"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"


export default function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(12)
  const [useUppercase, setUseUppercase] = useState(true)
  const [useLowercase, setUseLowercase] = useState(true)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useSymbols, setUseSymbols] = useState(true)
  const { toast } = useToast()

  const generatePassword = () => {
    let charset = ''
    if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (useLowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
    if (useNumbers) charset += '0123456789'
    if (useSymbols) charset += '#$&@!%*?'

    let newPassword = ''
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(newPassword)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      toast({
        description: "Contraseña copiada al portapapeles",
      })
    })
  }
  

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Generador de Contraseñas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="length">Longitud de la contraseña: {length}</Label>
            <Slider
              id="length"
              min={1}
              max={100}
              step={1}
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
              className="mt-2"
            />
          </div>
          <div className="space-y-2">
            <Label>Tipos de caracteres</Label>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="uppercase" checked={useUppercase} onCheckedChange={(checked) => setUseUppercase(checked === true)} />
                <Label htmlFor="uppercase">Mayúsculas (ABC)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="lowercase" checked={useLowercase} onCheckedChange={(checked) => setUseLowercase(checked === true)} />
                <Label htmlFor="lowercase">Minúsculas (abc)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="numbers" checked={useNumbers} onCheckedChange={(checked) => setUseNumbers(checked === true)} />
                <Label htmlFor="numbers">Números (123)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="symbols" checked={useSymbols} onCheckedChange={(checked) => setUseSymbols(checked === true)} />
                <Label htmlFor="symbols">Símbolos (#$&)</Label>
              </div>
            </div>
          </div>
          <Button onClick={generatePassword} className="w-full">
            Generar Contraseña
          </Button>
          {password && (
            <div className="mt-4 space-y-2">
              <Label htmlFor="generated-password">Contraseña generada</Label>
              <div className="flex space-x-2">
                <Input id="generated-password" value={password} readOnly className="flex-grow" />
                <Button onClick={copyToClipboard} size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}