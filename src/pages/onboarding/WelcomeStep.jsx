import React from 'react';

const WelcomeStep= ({ next }) => {
  
  return (
    <div>
      <p>Welcome</p>
      <button onClick={next} className='btn-primary '>get started</button>
    </div>
  );
};

export default WelcomeStep;