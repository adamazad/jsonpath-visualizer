import React from 'react';
import { HeaderFixed } from './layouts';
import NewQuery from './containers/NewQuery';

function App() {
  return (
    <HeaderFixed.Container>
      <HeaderFixed.Header>
        <h1>JSONPath Visualizer</h1>
      </HeaderFixed.Header>
      <HeaderFixed.Content>
        <NewQuery/>
      </HeaderFixed.Content>
    </HeaderFixed.Container>
  )
}

export default App;
