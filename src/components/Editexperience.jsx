import React from 'react';
import Updateexperience from "./Updateexperience";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Editexperience = () => {
  const experience = useSelector((store) => store.editexperience);
  const { experienceid } = useParams();
  const selectedExperience = Array.isArray(experience)
    ? experience.find(e => e._id === experienceid)
    : experience?._id === experienceid ? experience : null;

  return (
    <div>
      <Updateexperience experience={selectedExperience} />
    </div>
  );
};

export default Editexperience;
