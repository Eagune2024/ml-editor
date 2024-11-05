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
import WrapPromise from "@/utils/WrapPromise"
import supabase from "@/supabaseClient";
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import { initialFiles } from '@/views/IDE/bootstrap';
import { useAppContext } from "@/context/appContext";

const ProjectCard = function ({ project }) {
  return (
    <Link to={`/editor?projectId=${project.id}`} className="focus:shadow-none">
      <Card>
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>{project.name}</CardDescription>
        </CardHeader>
        <CardContent>
          {project.created_at}
        </CardContent>
        <CardFooter>123</CardFooter>
      </Card>
    </Link>
  )
}

const ProjectList = function ({promiseData}) {
  const { data: projectList, error } = promiseData.read()
  return (
    <div className="grid grid-cols-5 gap-4 p-10">
      { projectList.map((project, index) => (<ProjectCard project={project} key={index} />)) }
    </div>
  )
}

const LoadingSkeleton = function ({promiseData}) {
  return (
    <div className="grid grid-cols-5 gap-4 p-10">
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

export default function DemoView () {
  const { session } = useAppContext()
  const [query, setQuery] = useState(Date.now());

  const promiseData = useMemo(() => WrapPromise(supabase.from('Project').select('name, id, created_at')), [query])
  
  const createProject = async () => {
    await supabase.from('Project').insert([{
      name: 'test',
      files: initialFiles(),
      user_id: session.user.id
    }])
    setQuery(Date.now());
  }

  return (
    <>
      <Button className="mt-8 ml-10" onClick={createProject}>创建项目</Button>
      <Suspense fallback={<LoadingSkeleton />}>
        {<ProjectList promiseData={promiseData} />}
      </Suspense>
    </>
  )
}