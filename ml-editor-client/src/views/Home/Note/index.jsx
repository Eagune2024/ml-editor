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
import { MDXEditor } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

const BookList = function ({promiseData, currentBook, setCurrentBook, onBookClick}) {
  const { data: bookList, error } = promiseData.read()
  return (
    <nav className="grid gap-1 px-2">
      {
        bookList.map((book, index) => (
          <Button variant={ book.id === currentBook? '': 'ghost' } className="text-lg h-12" key={book.id} onClick={onBookClick(book.id)}>
            <FileTextIcon className="mr-2 h-6 w-6" />
            { book.name }
            <span className="ml-auto dark:text-white">{ book.note }</span>
          </Button>
        ))
      }
    </nav>
  )
}

const NoteList = function ({promiseData, currentNote, setCurrentNote}) {
  const { data: noteList, error } = promiseData.read()
  return (
    <nav className="grid gap-1 px-2">
      {
        noteList.map((note, index) => (
          <Button variant={ index === currentNote? '': 'ghost' } className="text-lg h-12 justify-start" key={index} onClick={() => setCurrentNote(index)}>
            <FileIcon className="mr-2 h-6 w-6"/>
            { note.name }
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
    const { error } = await createNoteBook(name)
    if (!error) setOpen(false)
    console.log(error)
  }

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger asChild>
        <Button className="rounded-b-none">添加笔记本</Button>
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

const CreateNoteDialog = ({createNote}) => {
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)

  const openChange = (open) => {
    setName('')
    setOpen(open)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await createNote(name)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger asChild>
        <div className="border-b border-solid border-black h-14">
          <Button variant="outline" className="m-2 w-32 border border-solid border-black"><Pencil2Icon className="mr-2"/>添加笔记</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>添加笔记</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">标题</Label>
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
  const [queryBookTrigger, setQueryBookTrigger] = useState(Date.now())
  const [queryNoteTrigger, setQueryNoteTrigger] = useState(Date.now())
  const [currentBook, setCurrentBook] = useState(null)
  const [currentNote, setCurrentNote] = useState(0)

  const bookClick = (index) => {
    return () => {
      setCurrentBook(index)
      setCurrentNote(0)
    }
  }

  const createNoteBook = async (name) => {
    const result = await supabase.from('Notebook').insert([{
      name: name,
      user_id: session.user.id
    }])
    if (!result.error) setQueryBookTrigger(Date.now())
    return result
  }

  const createNote = async (name) => {
    const result = await supabase.from('Note').insert([{
      name: name,
      notebook_id: currentBook,
      content: '',
      user_id: session.user.id
    }])
    if (!result.error) setQueryNoteTrigger(Date.now())
    return result
  }

  const fetchBook = async () => {
    const res = await supabase.from('Notebook').select('name, id, created_at')
    if (res.data.length) setCurrentBook(res.data[0].id)
    return res
  }
  const fetchNote = async () => {
    if (currentBook === null) return { data: [] }
    const res = await supabase.from('Note').select('name, id, created_at').eq('notebook_id', currentBook)
    if (res.data.length) setCurrentNote(res.data[0].id)
    return res
  }
  const promiseData = useMemo(() => WrapPromise(fetchBook()), [queryBookTrigger])
  const promiseNoteData = useMemo(() => WrapPromise(fetchNote()), [queryNoteTrigger, currentBook])

  return (
    <div className="flex flex-1 border border-black m-4 rounded-lg overflow-hidden">
      <div className="h-full flex flex-col border-r border-black">
        <div className="border-b border-solid border-black h-14 flex items-center pl-4">
          我的笔记本
        </div>
        <ScrollArea className="flex-1 flex flex-col gap-4 py-2 w-72 border-r">
          <Suspense fallback={<>Loading...</>}>
            <BookList promiseData={promiseData} currentBook={currentBook} setCurrentBook={setCurrentBook} onBookClick={bookClick}/>
          </Suspense>
        </ScrollArea>
        <CreateDialog createNoteBook={createNoteBook} />
      </div>
      <div className="h-full flex flex-col border-r border-black">
        <CreateNoteDialog createNote={createNote} />
        <ScrollArea className="flex-1 flex flex-col gap-4 py-2 w-80 border-r">
          <Suspense fallback={<>Loading...</>}>
            <NoteList promiseData={promiseNoteData} currentNote={currentNote} setCurrentNote={setCurrentNote} onBookClick={bookClick}/>
          </Suspense>
        </ScrollArea>
      </div>
      <div className="flex-1">
        <div className="border-b border-solid border-black h-14 flex items-center pl-4">
          文章标题
        </div>
        <MDXEditor markdown="hello world" onChange={console.log} readOnly />
      </div>
    </div>
  )
}