import { useMemo, useState, Suspense } from "react";
import { Button } from "@/components/ui/button"
import { FileTextIcon, FileIcon } from "@radix-ui/react-icons"
import { ScrollArea } from "@/components/ui/scroll-area"
import WrapPromise from "@/utils/WrapPromise"
import supabase from "@/supabaseClient";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useAppContext } from "@/context/appContext";
import { Pencil2Icon } from "@radix-ui/react-icons"

const BookList = function ({promiseData, currentBook}) {
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

const CreateDialog = function ({createNoteBook}) {
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)

  const openChange = (open) => {
    setName('')
    setOpen(open)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await createNoteBook(name)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger asChild>
        <Button>添加笔记本</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>添加笔记本</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">名称</Label>
              <Input
                id="name"
                value={name}
                className="col-span-3"
                onChange={(e) =>
                  setName(e.target.value)
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">创建</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function NoteView () {
  const { session } = useAppContext()
  const [queryBook, setQueryBook] = useState(Date.now())
  const [currentBook, setCurrentBook] = useState(0)
  const [currentNote, setCurrentNote] = useState(0)

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

  const createNoteBook = async (name) => {
    await supabase.from('Notebook').insert([{
      name: name,
      user_id: session.user.id
    }])
    setQueryBook(Date.now())
  }

  const promiseData = useMemo(() => WrapPromise(supabase.from('Notebook').select('name, id, created_at')), [queryBook])

  return (
    <div className="flex flex-1 border m-4 rounded-lg overflow-hidden">
      <div className="h-full flex flex-col">
        <ScrollArea className="flex-1 flex flex-col gap-4 py-2 w-72 border-r">
          <Suspense fallback={<>Loading...</>}>
            {<BookList promiseData={promiseData} currentBook={currentBook}/>}
          </Suspense>
        </ScrollArea>
        <CreateDialog createNoteBook={createNoteBook} />
      </div>
      <div className="h-full flex flex-col">
        <Button variant="outline" className="m-2 w-32 border border-solid border-black"><Pencil2Icon className="mr-2"/>添加笔记</Button>
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-4 py-2 w-80 border-r">
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
      </div>
      <div className="flex-1"></div>
    </div>
    
  )
}