"use client"

import React, { useState, useCallback } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import * as Select from '@radix-ui/react-select'
import { ChevronDownIcon } from '@radix-ui/react-icons'

function hexToRgba(hex, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export default function QRCodeGenerator() {
  const [link, setLink] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [qrPosition, setQRPosition] = useState('top')
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF')
  const [transparency, setTransparency] = useState(1)

  const generateQRCode = (e) => {
    e.preventDefault()
    const params = new URLSearchParams({
      link,
      title,
      description,
      qrPosition,
      backgroundColor: hexToRgba(backgroundColor, transparency)
    })
    window.open(`/qr-display?${params.toString()}`, '_blank')
  }

  const handleColorChange = useCallback((e) => {
    setBackgroundColor(e.target.value)
  }, [])

  const handleTransparencyChange = useCallback((e) => {
    setTransparency(parseFloat(e.target.value))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <h1 className="text-4xl font-bold text-center py-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white">Generate Your Awesome QR 🎨</h1>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 p-8">
            <form onSubmit={generateQRCode} className="space-y-6">
              <div>
                <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link</label>
                <input
                  type="url"
                  id="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50 transition duration-300"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50 transition duration-300"
                  placeholder="Awesome Title"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50 transition duration-300"
                  placeholder="Awesome Description"
                  rows={3}
                />
              </div>
              <div>
                <label htmlFor="qrPosition" className="block text-sm font-medium text-gray-700">QR Position</label>
                <Select.Root value={qrPosition} onValueChange={setQRPosition}>
                  <Select.Trigger className="inline-flex items-center justify-between rounded-md px-4 py-2 text-sm w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                    <Select.Value />
                    <Select.Icon>
                      <ChevronDownIcon />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg">
                      <Select.Viewport className="p-2">
                        <Select.Item value="top" className="text-sm text-gray-700 rounded-md flex items-center h-8 px-4 relative select-none hover:bg-pink-100 focus:bg-pink-100 outline-none cursor-pointer">
                          <Select.ItemText>Top</Select.ItemText>
                        </Select.Item>
                        <Select.Item value="bottom" className="text-sm text-gray-700 rounded-md flex items-center h-8 px-4 relative select-none hover:bg-pink-100 focus:bg-pink-100 outline-none cursor-pointer">
                          <Select.ItemText>Bottom</Select.ItemText>
                        </Select.Item>
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>
              <div>
                <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700">Background Color</label>
                <div className="mt-1 flex items-center">
                  <input
                    type="color"
                    id="backgroundColor"
                    value={backgroundColor}
                    onChange={handleColorChange}
                    className="w-8 h-8 rounded-md border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={handleColorChange}
                    className="ml-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50 transition duration-300"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="transparency" className="block text-sm font-medium text-gray-700">Opacity</label>
                <input
                  type="range"
                  id="transparency"
                  min="0"
                  max="1"
                  step="0.01"
                  value={transparency}
                  onChange={handleTransparencyChange}
                  className="mt-1 block w-full"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {Math.round(transparency * 100)}%
                </div>
              </div>
              <button type="submit" className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition duration-300">
                Generate Awesome QR
              </button>
            </form>
          </div>
          <div className="w-full lg:w-1/2 p-8 bg-gradient-to-br from-pink-100 to-purple-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">미리보기</h2>
            <div
              className={`rounded-2xl shadow-lg p-6 ${qrPosition === 'top' ? 'flex flex-col' : 'flex flex-col-reverse'}`}
              style={{ backgroundColor: hexToRgba(backgroundColor, transparency) }}
            >
              {link && (
                <div className={`${qrPosition === 'top' ? 'mb-4' : 'mt-4'} flex justify-center`}>
                  <QRCodeSVG value={link} size={200} bgColor="#FFFFFF" fgColor="#FF69B4" />
                </div>
              )}
              <div className="text-center">
                {title && <h3 className="text-2xl font-bold mb-2 text-pink-600">{title}</h3>}
                {description && <p className="text-lg text-gray-600">{description}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}