import React from 'react';
import { useQuery } from 'urql';
import { observer } from "mobx-react";

const getTodos = `
{
  characters (page:1, filter: {species:"Human"}){
   results {
     id, name, type, origin {dimension}
   }
 }
 }
`;

const App = ({ limit = 10 }) => {
  const [result] = useQuery({
    query: getTodos,
    variables: { limit },
  });

  if (result.fetching) return 'Loading...';
  if (result.error) return 'Oh no!';


  const Name = observer(({dude}) => <span>{dude.name}</span>)
  return (
    <ul>
      {result.data.characters.results.map((dude) => (
        <li key={dude.id}><Name dude={dude} /> {dude.origin.dimension}</li>
      ))}
    </ul>
  );
};

export default App