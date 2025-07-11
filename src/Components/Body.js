import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'


const Body = () => {

  return (
    <div>
      <NavBar />
      <Outlet /> 

    </div>
  )
}

export default Body
