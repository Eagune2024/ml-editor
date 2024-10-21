import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../supabaseClient";
import { initialFiles } from '../../IDE/bootstrap';
import { useAppContext } from "../../../context/appContext";

const ProjectCard = function ({ project }) {
  const navigate = useNavigate();

  const toEditor = () => {
    navigate(`/editor?projectId=${project.id}`)
  }

  return (
    <div
      onClick={toEditor} 
    >
      {project.name}
      {project.created_at}
    </div>
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
        projectList.map(project => (<ProjectCard project={project} />))
      }
    </>
  )
}