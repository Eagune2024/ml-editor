import { useMemo, useState, Suspense } from "react";
import { Button } from "@/components/ui/button"
import { FileTextIcon, FileIcon } from "@radix-ui/react-icons"
import { ScrollArea } from "@/components/ui/scroll-area"
import WrapPromise from "@/utils/WrapPromise"
import supabase from "@/supabaseClient";

const BookList = function ({promiseData}) {
  const { data: bookList, error } = promiseData.read()
  return (
    <nav className="grid gap-1 px-2">
      {
        bookList.map((book, index) => (
          <Button variant={ index === currentBook? '': 'ghost' } className="text-lg h-12" key={index}>
            <FileTextIcon className="mr-2 h-6 w-6" />
            { book.name }
            <span className="ml-auto dark:text-white">{ book.note }</span>
          </Button>
        ))
      }
    </nav>
  )
}

export default function NoteView () {
  const [queryBook, setQueryBook] = useState(Date.now())

  const [currentBook, setCurrentBook] = useState(0)
  const [currentNote, setCurrentNote] = useState(0)

  const bookList = [
    { name: '默认记事本', note: 5 },
    { name: 'Vue记事本', note: 12 },
    { name: 'React记事本', note: 8 },
    { name: '前端记事本', note: 21 },
    { name: 'Three记事本', note: 4 },
    { name: 'p5记事本', note: 2 },
  ]

  const noteList = [
    { name: '1' },
    { name: '2' },
    { name: '3' },
    { name: '4' },
    { name: '5' },
    { name: '6' },
    { name: '7' },
    { name: '8' },
    { name: '9' },
    { name: '1' },
    { name: '2' },
    { name: '3' },
    { name: '4' },
    { name: '5' },
    { name: '6' },
    { name: '7' },
    { name: '8' },
    { name: '9' },
    { name: '1' },
    { name: '2' },
    { name: '3' },
    { name: '4' },
    { name: '5' },
    { name: '6' },
    { name: '7' },
    { name: '8' },
    { name: '9' },
  ]

  const bookClick = (index) => {
    return () => {
      setCurrentBook(index)
      setCurrentNote(0)
    }
  }

  const promiseData = useMemo(() => WrapPromise(supabase.from('Notebook').select('name, id, created_at')), [queryBook])

  return (
    <div className="flex flex-1 border m-4 rounded-lg overflow-hidden">
      <ScrollArea className="group flex flex-col gap-4 py-2 w-72 h-full border-r">
        <Suspense fallback={<>Loading...</>}>
          {<BookList promiseData={promiseData} />}
        </Suspense>
      </ScrollArea>
      <ScrollArea className="h-full">
        <div className="group flex flex-col gap-4 py-2 w-80 border-r">
          <div className="grid gap-1 px-2">
            {
              noteList.map((note, index) => (
                <Button variant={ index === currentNote? '': 'ghost' } className="text-lg h-12 justify-start" key={index} onClick={() => setCurrentNote(index)}>
                  <FileIcon className="mr-2 h-6 w-6"/>
                  { note.name }
                </Button>
              ))
            }
          </div>
        </div>
      </ScrollArea>
      <div className="flex-1"></div>
    </div>
    
  )
}