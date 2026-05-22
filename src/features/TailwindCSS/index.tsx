import React from "react";

const TailwindCSS = () => {
  return (
    <div className="container mx-auto h-125">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border p-4">Block 1</div>
        <div className="border p-4">Block 2</div>
        <div className="border p-4">Block 3</div>
        <div className="border p-4">Block 4</div>
      </div>
    </div>
  );
};

export default TailwindCSS;
