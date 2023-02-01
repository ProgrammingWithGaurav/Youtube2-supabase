import { useStateContext } from '../context/StateContext';

const Sidebar = () => {
  const {isSidebar, SidebarIcons, activeSidebar} = useStateContext();
  return (
    <div className={`${isSidebar ? 'max-w-[200px]' : 'max-w-[40px]'} h-full flex flex-col justify-self-center`}>
        {isSidebar ? 
        SidebarIcons?.map(icon => (
            <div className={`flex items-center cursor-pointer ${activeSidebar === icon.name && 'dark:bg-white/10'}`} key={icon.name}>
              <span className='1/3'>
              {icon.icon}
              </span>
                {icon.name}
                </div>
        ))
        : 'Closed'}
    </div>
  )
}

export default Sidebar