import { Button } from "@/components/ui/button"
import { FileTextIcon, FileIcon } from "@radix-ui/react-icons"
import { useState } from "react"

export default function NoteView () {

  const [currentBook, setCurrentBook] = useState(0)

  const bookList = [
    { name: '默认记事本', note: 5 },
    { name: 'Vue记事本', note: 12 },
    { name: 'React记事本', note: 8 },
    { name: '前端记事本', note: 21 },
    { name: 'Three记事本', note: 4 },
    { name: 'p5记事本', note: 2 },
  ]

  return (
    <div className="flex flex-1 border m-4 rounded-lg">
      <div className="group flex flex-col gap-4 py-2 w-72 h-full border-r">
        <nav className="grid gap-1 px-2">
          { bookList.map((book, index) => (
            <Button variant={ index === currentBook? '': 'ghost' } className="text-lg h-12" key={index} onClick={() => setCurrentBook(index)}>
              <FileTextIcon className="mr-2 h-6 w-6" />
              { book.name }
              <span className="ml-auto dark:text-white">{ book.note }</span>
            </Button>
          ))}
        </nav>
      </div>
      <div className="group flex flex-col gap-4 py-2 w-72 h-full border-r">
        <nav className="grid gap-1 px-2">
          <Button className="text-lg h-12 justify-start">
            <FileIcon className="mr-2 h-6 w-6"/>
            默认记事本
          </Button>
        </nav>
      </div>
      <div className="flex-1"></div>
    </div>
    
  )
}