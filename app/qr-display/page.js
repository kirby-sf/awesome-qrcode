"use client"

import React, { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { useSearchParams } from 'next/navigation'

export default function QRCodeDisplay() {
  const searchParams = useSearchParams()
  const [link, setLink] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [qrPosition, setQRPosition] = useState('top')
  const [backgroundColor, setBackgroundColor] = useState('rgba(255, 255, 255, 1)')
  const [qrSize, setQrSize] = useState(0)

  useEffect(() => {
    setLink(searchParams.get('link') || '')
    setTitle(searchParams.get('title') || '')
    setDescription(searchParams.get('description') || '')
    setQRPosition(searchParams.get('qrPosition') || 'top')
    setBackgroundColor(searchParams.get('backgroundColor') || 'rgba(255, 255, 255, 1)')

    const updateQrSize = () => {
      const minDimension = Math.min(window.innerWidth, window.innerHeight)
      setQrSize(Math.min(minDimension * 0.5, 300))
    }

    updateQrSize()
    window.addEventListener('resize', updateQrSize)
    return () => window.removeEventListener('resize', updateQrSize)
  }, [searchParams])

  return (
    <div className="min-h-screen w-full bg-transparent flex items-stretch rounded-3xl shadow-2xl overflow-hidden">
      <div className="flex-grow shadow-lg flex flex-col justify-between" style={{ backgroundColor }}>
        {qrPosition === 'top' ? (
          <>
            <div className="flex justify-center items-center p-4">
              <QRCodeSVG value={link} size={qrSize} bgColor="#FFFFFF" fgColor="#FF69B4" />
            </div>
            <div className="text-center p-4">
              {title && <h3 className="text-2xl font-bold mb-2 text-pink-600">{title}</h3>}
              {description && <p className="text-lg text-gray-600">{description}</p>}
            </div>
          </>
        ) : (
          <>
            <div className="text-center p-4">
              {title && <h3 className="text-2xl font-bold mb-2 text-pink-600">{title}</h3>}
              {description && <p className="text-lg text-gray-600">{description}</p>}
            </div>
            <div className="flex justify-center items-center p-4">
              <QRCodeSVG value={link} size={qrSize} bgColor="#FFFFFF" fgColor="#FF69B4" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}