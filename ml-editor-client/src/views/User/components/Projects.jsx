import { useMemo, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "@/supabaseClient";
import { initialFiles } from '@/views/IDE/bootstrap';
import { useAppContext } from "@/context/appContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import WrapPromise from "@/utils/WrapPromise"

const ProjectCard = function ({ project }) {
  const navigate = useNavigate();

  const toEditor = () => {
    navigate(`/editor?projectId=${project.id}`)
  }

  return (
    <Card onClick={toEditor} >
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.name}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {project.created_at}
      </CardContent>
    </Card>
  )
}

const ProjectList = function ({promiseData}) {
  const { data: projectList, error } = promiseData.read()
  return (
    projectList.map((project, index) => (<ProjectCard project={project} key={index} />))
  )
}

export default function Projects () {
  const { session } = useAppContext()
  
  const promiseData = useMemo(() => WrapPromise(supabase.from('Project').select('name, id, created_at')), [])

  const createProject = async () => {
    await supabase.from('Project').insert([{
      name: 'test',
      files: initialFiles(),
      user_id: session.user.id
    }])
  }

  return (
    <>
      <button
        onClick={createProject}
      >
        创建项目
      </button>
      <Suspense
        fallback={
          <div className="flex items-center text-sm text-muted-foreground">
            <LoadingSpinner />
          </div>
        }
      >
        {<ProjectList promiseData={promiseData} />}
      </Suspense>
    </>
  )
}