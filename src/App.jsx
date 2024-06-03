import React, { useState } from 'react'
import Title from './components/title'
import Card from './components/card'
import Case from './components/Case'

export default function App() {
  const [name, setName] = useState('Leo')
  return (
    <Case>
    <div className='bg-gray-900 flex items-center flex-col min-h-screen pt-20'>
        <div className="bg-gray-800 border-t border-gray-600 shadow rounded-lg max-w-lg w-full p-6">
        <h4 className='text-white text-2xl'>Hello {name}</h4>
            <p className='text-lg text-gray-400 leading-relaxed'>Selamat datang di Website Consume-Inventaris-Api</p>
      <Title nama="Dimas Leo Anugrah" nis="12208970" bell="PPLG XI-4" ray="Cicurg 4"></Title>
        </div>
              <Card ming="Produktif" pela="React Jsx."></Card>
    </div>
    </Case>
    
  )
}