import { useEffect, useState } from "react";
import { Student } from "./Student";

export function Students() {

  const [students, setStudents] = useState([]);
  useEffect(() => {
    fetch("https://b28-assign-mentor.herokuapp.com/students")
      .then((data) => data.json())
      .then((data2) => setStudents(data2));
  }, []);

  return <div className="content">
    {students.map((student) => 
    <Student 
    name={student.name} 
    id={student.id} 
    mentor={student.mentor} 
    key={student._id}
  
    />)}
  </div>;

}
