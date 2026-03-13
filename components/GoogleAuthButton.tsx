'use client'

import { Button } from '@/components/ui/button'

interface GoogleAuthButtonProps {
  label?: string
  onClick?: () => void
}

export default function GoogleAuthButton({
  label = 'Continue with Google',
  onClick = () => {},
}: Partial<GoogleAuthButtonProps>) {
  return (
    <Button onClick={onClick} variant="outline" className="w-full">
      <span className="mr-2">G</span>
      {label}
    </Button>
  )
}
