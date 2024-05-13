// components/RecipeSteps.tsx
import React from 'react';

interface RecipeStepsProps {
  steps: string;
}

const RecipeSteps: React.FC<RecipeStepsProps> = ({ steps }) => {
  return (
    <div style={{ whiteSpace: 'pre-wrap' }}>
      {steps}
    </div>
  );
};

export default RecipeSteps;