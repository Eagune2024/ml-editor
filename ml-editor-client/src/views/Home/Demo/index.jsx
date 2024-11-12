import { useMemo, useState, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import WrapPromise from "@/utils/WrapPromise"
import supabase from "@/supabaseClient";
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import { initialFiles } from '@/views/IDE/bootstrap';
import { useAppContext } from "@/context/appContext";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { OpenInNewWindowIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons"

const ProjectCard = function ({ project, deleteProject }) {
  return (
    <Card className="hover:border-black">
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.name}</CardDescription>
      </CardHeader>
      <CardContent>
        {project.created_at}
      </CardContent>
      <CardFooter className="flex">
        <Link to={`/project/${project.id}`} className="flex flex-1 focus:shadow-none" target="_blank">
          <Button variant="ghost" size="icon" className="flex-1">
            <OpenInNewWindowIcon />
          </Button>
        </Link>
        <Link to={`/editor?projectId=${project.id}`} className="flex flex-1 focus:shadow-none" target="_blank">
          <Button variant="ghost" size="icon" className="flex-1">
            <Pencil2Icon />
          </Button>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger className="flex-1 focus:shadow-none h-9 w-9 hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors">
            <TrashIcon />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>确定要删除吗?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="focus:shadow-none">取消</AlertDialogCancel>
              <AlertDialogAction className="focus:shadow-none" onClick={() => { deleteProject(project) }}>确定</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}

const ProjectList = function ({promiseData, deleteProject}) {
  const { data: projectList, error } = promiseData.read()
  return (
    <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4 p-10">
      { projectList.map((project, index) => (<ProjectCard project={project} key={index} deleteProject={deleteProject} />)) }
    </div>
  )
}

const LoadingSkeleton = function () {
  return (
    <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4 p-10">
      {
        [...Array(10)].map((item, index) => {
          return (
            <div className="flex flex-col space-y-3" key={index}>
              <Skeleton className="animate-pulse h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="animate-pulse h-4 w-[250px]" />
                <Skeleton className="animate-pulse h-4 w-[200px]" />
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

const CreateDialog = function ({createProject}) {
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)

  const openChange = (open) => {
    setName('')
    setOpen(open)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await createProject(name)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger asChild>
        <Button className="mt-8 ml-10">创建项目</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>创建DEMO</DialogTitle>
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

export default function DemoView () {
  const { session } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState(Date.now())
  const promiseData = useMemo(() => WrapPromise(supabase.from('Project').select('name, id, created_at')), [query])
  
  const createProject = async (name) => {
    setLoading(true)
    await supabase.from('Project').insert([{
      name: name,
      files: initialFiles(),
      user_id: session.user.id
    }])
    setQuery(Date.now())
    setLoading(false)
  }

  const deleteProject = async (project) => {
    setLoading(true)
    await supabase.from('Project').delete().eq('id', project.id)
    setQuery(Date.now())
    setLoading(false)
  }
  
  return (
    <div>
      <CreateDialog createProject={createProject} />
      <Suspense fallback={<LoadingSkeleton />}>
        {<ProjectList promiseData={promiseData} deleteProject={deleteProject} />}
      </Suspense>
    </div>
  )
}