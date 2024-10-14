import { useEffect, useState } from "react";
import supabase from "../../../supabaseClient";
import { initialFiles } from '../../IDE/bootstrap';
import { useAppContext } from "../../../context/appContext";

const ProjectCard = function ({ project }) {
  return (
    <div>
      {project.name}
      {project.created_at}
    </div>
  )
}

export default function Projects () {
  const { session } = useAppContext()
  const [projectList, setProjectList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('Project').select('name, id, created_at')
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
        projectList.map(project => (<ProjectCard project={project} />))
      }
    </>
  )
}