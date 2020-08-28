import React, { useState, createRef } from 'react';
import Styled from 'styled-components';

import { JSONPath } from 'jsonpath-plus';
// Sample datasets
import { PancakeStack } from '../layouts';
import JsonTree from '../components/JsonTree';

const Matches = Styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  max-height: 540px;
`;

const AsideWithShadhow = Styled(PancakeStack.Aside)`
  padding: 20px;
  width: 100%;
  box-shadow: 6px 0px 6px 0px rgba(0,0,0,.12);
  flex-direction: column;
  z-index: 0;
`;

const JsonContainer = Styled.div`
  position: relative;
  overflow: auto;
  width: 100%;

  > .json-tree {
    position: absolute;
    padding: 20px;
  }
`;

/**
 *
 * @param {import('react').Props} props
 * @param {Object} props.json
 */
function Visualizer({ json }) {

  const [query, setQuery] = useState('');
  const [querySeconds, setQuerySeconds] = useState(0);
  const [matches, setMatches] = useState([]);

  const ref = createRef();

  // When the query changes
  let timer;
  const onQueryChange = ({ target }) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const jsonRef = ref.current;

      if ([query, ""].includes(target.value.trim())) {
        // Clear up previous results
        return jsonRef.querySelectorAll('[data-path]').forEach(jsonNode => jsonNode.classList.remove('json-highlight'));
      }

      // Find the results from the JSON
      let timeStart = performance.now();
      // Find the pointers using JSONPath
      let pointers = JSONPath({
        json,
        path: target.value,
        preventEval: true,
        resultType: "pointer",
      });
      // Performance ends
      let timeEnd = performance.now();

      // Clear up previous results
      jsonRef.querySelectorAll('[data-path]').forEach(jsonNode => jsonNode.classList.remove('json-highlight'));

      // Convert pointers to DOM selector
      const pointerSelectors = pointers.map(pointer => `[data-path="${pointer}"]`).join(',');
      if (pointerSelectors) {
        // Highlight the matching pointers
        jsonRef.querySelectorAll(pointerSelectors).forEach(jsonNode => jsonNode.classList.add('json-highlight'));
        // Travel to first match
        console.log(pointers);
        traverseTo(pointers[0]);
      }

      // Update state
      setQuery(target.value);
      // performance
      setQuerySeconds((timeEnd - timeStart).toFixed(3));
      // Number of results
      setMatches(pointers);

    }, 200);
  };


  const traverseTo = (pointer) => {

    const jsonRef = ref.current;
    const element = jsonRef.querySelector(`[data-path="${pointer}"]`);
    // Scroll to if found
    element && element.scrollIntoView({ behavior: 'smooth' });

  }

  return (
    <PancakeStack.Container>
      <AsideWithShadhow>
          <form>
            <div>
              <label>Query</label>
              <input type="text" id="query" onChange={ onQueryChange } placeholder="Search query" />
            </div>
          </form>
          <small>
            { query.trim() !== "" && (<>Found {matches.length} results ({querySeconds} ms)</>) }
          </small>
          <Matches>
            { matches.length > 0 && (
              matches.map(match => <button className="link" data-path={match} onClick={ () => traverseTo(match) }>{ match }</button>)
            ) }
          </Matches>
      </AsideWithShadhow>
      <PancakeStack.Main>
        <JsonContainer>
          <JsonTree json={ json } ref={ ref } />
        </JsonContainer>
      </PancakeStack.Main>
    </PancakeStack.Container>
  );
}

export default Visualizer;