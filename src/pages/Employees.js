import "../index.css";
import Employee from "../components/Employee";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddEmployee from "../components/AddEmployee";
import EditEmployee from "../components/EditEmployee";
import Header from "../components/Header";

function Employees() {

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Caleb",
      role: "Developer",
      img: "https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg",
    },
    {
      id: 2,
      name: "Richard",
      role: "Intern",
      img: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 3,
      name: "Jennifer",
      role: "Developer",
      img: "https://images.pexels.com/photos/2169434/pexels-photo-2169434.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 4,
      name: "Justin",
      role: "Manager",
      img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ]);

  function updateEmployee(id, newName, newRole) {
    const updateEmployees = employees.map((employee) => {
      if (id == employee.id) {
        return { ...employee, name: newName, role: newRole };
      }

      return employee;
    });
    setEmployees(updateEmployees);
  }
  function newEmployee(name, role, img) {
    const newEmployee = {
      id: uuidv4(),
      name: name,
      role: role,
      img: img,
    };
    setEmployees([...employees, newEmployee]);
  }

  const showEmployees = true;
  return (
    <div className="">
      
      {showEmployees ? (
        <>
          
          <div className="flex flex-wrap justify-center">
            {employees.map((employee) => {
              const editEmployee = (
                <EditEmployee
                  id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  updateEmployee={updateEmployee}
                />
              );
              return (
                <Employee
                  key={employee.id}
                  id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  img={employee.img}
                  editEmployee={editEmployee}
                />
              );
            })}
          </div>
          <AddEmployee newEmployee={newEmployee} />
        </>
      ) : (
        <p>You cannot see employees</p>
      )}
    </div>
  );
}

export default Employees;
