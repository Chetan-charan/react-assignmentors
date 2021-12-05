import { useEffect, useState } from "react";
import { Mentor } from "./Mentor";

export function Mentors() {

  const [mentors, setMentors] = useState([]);
  useEffect(() => {
    fetch("https://b28-assign-mentor.herokuapp.com/mentors")
      .then((data) => data.json())
      .then((data1) => setMentors(data1));

  }, []);

  return <div className="content">
    {mentors.map((mentor) => <Mentor name={mentor.name} students={mentor.students} id={mentor.id} key={mentor._id} />)}
  </div>;


}
