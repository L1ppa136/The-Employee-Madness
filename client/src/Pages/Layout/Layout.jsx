import { Outlet, Link } from 'react-router-dom';

import './Layout.css';

const Layout = () => (
  <div className='Layout'>
    <nav>
      <ul>
        <li className='grow'>
          <Link to='/'>
            <button type='button' id='EmployeesSign'>
              Employees
            </button>
          </Link>
          <Link to='/equipments'>
            <button type='button' id='EquipmentSign'>
              Equipments
            </button>
          </Link>
        </li>
        <li>
          <Link to='/create'>
            <button type='button'>Create Employee</button>
          </Link>
          <Link to='/equipments/create'>
            <button type='button'>Create Equipment</button>
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default Layout;
