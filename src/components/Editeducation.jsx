import React from 'react';
import Updateeducation from "./Updateeducation";
import Updateexperience from "./Updateexperience"
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Editeducation = () => {
  const education = useSelector((store) => store.education);
  const { educationid } = useParams();
  const selectedEducation = Array.isArray(education)
    ? education.find(e => e._id === educationid)
    : education?._id === educationid ? education : null;

  //   if (!selectedEducation) {
  //     return <div>Loading or Education not found</div>;
  //   }

  return (
    <div>
      <Updateeducation education={selectedEducation} />
    </div>
  );
};

export default Editeducation;
