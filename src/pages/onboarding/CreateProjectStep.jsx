import React from 'react';

const CreateProjectStep = ({finish}) => {
  return (
    <div>
      <p>create project</p>
      <button onClick={finish}>finish</button>
    </div>
  );
};

export default CreateProjectStep;