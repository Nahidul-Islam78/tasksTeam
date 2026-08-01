import React from 'react';

const CreateWorkSpaceStep = ({next}) => {
  return (
    <div>
      <p>workSpace</p>
      <button onClick={next}>next</button>
    </div>
  );
};

export default CreateWorkSpaceStep;