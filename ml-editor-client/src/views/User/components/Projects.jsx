import { useEffect } from "react";
import supabase from "../../../supabaseClient";
import { initialFiles } from '../../IDE/bootstrap';
import { useAppContext } from "../../../context/appContext";

export default function Projects () {
  const { session } = useAppContext()

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('Project').select('*')
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
    <button
      onClick={createProject}
    >
      创建项目
    </button>
  )
}