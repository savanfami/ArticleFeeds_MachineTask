// import React, { useReducer, useState } from "react";

// export const Parent = () => {
//     const [state,setState]=useState()
  
//     reducer=useReducer((prev)=>{
//        setState(prev)
//     })
  
//   const [child, setChild] = useState();

//   const handleChange = (prev) => {
//     var out=useReducer(prev)
//     setChild(prev);
//   }

// const hello=()=>{
//     console.log('hai')
// }
// hello()


//   return (
//     <div>
//       <ChildComponent props={state} child={handleChange} />
//       <h2>from chlid {child}</h2>
//     </div>
//   );
// };

// const ChildComponent = ({ prop, child }) => {
//   const value = "child component";

//   child(value);

//   return (
//     <div>
//       <h1>hai hello {prop}!!!</h1>
//     </div>
//   );
// };
