import { Link } from "react-router-dom";
import { useMatch } from 'react-router-dom';
import classnames from 'classnames'
import BoomIcon from '../../../assets/Boom.svg';

export default function MenuBar () {
  const matchPPT = useMatch('/ppt');
  const matchNote = useMatch('/note');
  const matchDemo = useMatch('/demo');

  const pptClassNames = classnames('p-8 h-full hover:bg-violet-100', { 'bg-violet-100': matchPPT })
  const noteClassNames = classnames('p-8 h-full hover:bg-violet-100', { 'bg-violet-100': matchNote })
  const demoClassNames = classnames('p-8 h-full hover:bg-violet-100', { 'bg-violet-100': matchDemo })

  return (
    <div className="flex items-center bg-slate-50">
      <Link to="" className="focus:shadow-none">
        <div className="flex justify-center w-40"><BoomIcon className="w-20 h-10" /></div>
      </Link>
      <Link to="ppt" className="focus:shadow-none">
        <div className={pptClassNames}>演示</div>
      </Link>
      <Link to="note" className="focus:shadow-none">
        <div className={noteClassNames}>笔记</div>
      </Link>
      <Link to="demo" className="focus:shadow-none">
        <div className={demoClassNames}>代码</div>
      </Link>
    </div>
  )
}