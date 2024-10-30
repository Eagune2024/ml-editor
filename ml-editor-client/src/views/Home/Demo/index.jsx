import { useMemo, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import WrapPromise from "@/utils/WrapPromise"
import supabase from "@/supabaseClient";

const ProjectCard = function ({ project }) {
  const navigate = useNavigate();

  const toEditor = () => {
    navigate(`/editor?projectId=${project.id}`)
  }

  return (
    <Card onClick={toEditor}>
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
    <div className="flex p-10">
      { projectList.map((project, index) => (<ProjectCard project={project} key={index} />)) }
    </div>
  )
}

export default function DemoView () {
  const promiseData = useMemo(() => WrapPromise(supabase.from('Project').select('name, id, created_at')), [])

  return (
    <Suspense
      fallback={
        <div className="flex flex-col space-y-3">
          <Skeleton className="animate-pulse h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="animate-pulse h-4 w-[250px]" />
            <Skeleton className="animate-pulse h-4 w-[200px]" />
          </div>
        </div>
      }
    >
      {<ProjectList promiseData={promiseData} />}
    </Suspense>
    
    
  )
}