import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../supabaseClient";
import { initialFiles } from '../../IDE/bootstrap';
import { useAppContext } from "../../../context/appContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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

export default function Projects () {
  const { session } = useAppContext()
  const [projectList, setProjectList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { data, error } = await supabase.from('Project').select('name, id, created_at')
      setLoading(false)
      setProjectList(data)
    }
    fetchData();
  }, [])

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
      {
        loading
      }
      {
        projectList.map((project, index) => (<ProjectCard project={project} key={index} />))
      }
    </>
  )
}