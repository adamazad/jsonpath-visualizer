import Classie from 'desandro-classie';
import React, { useEffect, memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
// Import Utils
import Utils from './helprs';
// Import style
import './JsonTree.scss';

const TOGGLE_BUTTON_CLASSNAME = `json-button-expand`;
/**
 * Expand/collapse button
 */
const ExpandButton = ({ collapse, ...props }) => <button className={TOGGLE_BUTTON_CLASSNAME} { ...props }></button>

/**
 * A recursive fucntion that transforms a JSON object to HTML representation.
 *
 *
 * @param {Object} options
 * @param {Object|string|any[]} options.json The JSON value at this location/level
 * @param {string} options.location The current location in the tree, in JSONPath Pointer format
 * @param {boolean} options.root Indicate if the current element is a root
 */
function JsonToHTML({ json, location = '/', root = false }) {

  // Each key has data-path attribute which is used to highlight the matches from JSONPath

  // If the value is printable
  // for strucutres such as: "foobar", 1, null
  // These values do not require a expand button
  if (Utils.isValuePrintable(json)) {
    return (
        <span
          className={ `json-value ${typeof json }`}
          data-path={location}
        >
        { Utils.toPrintableValue(json) }
      </span >
    );
  }

  // If the value is an key:value object
  // Valid cases
  // {"foo":"bar"}
  // [{},"foo",]
  return (
    <>
      { Object.keys(json).map(k => {

        let nextLocation = `${!root ? location : ''}/${k}`;
        // Retrieve the actual value because typeof returns object for both {} and []
        let valueType = Utils.toValueType(json[k]);
        /**
         * Cases:
         * "foo": string
         * "foo": number
         * "foo": null
         * "foo": undefined
         * "foo": boolean
         * "foo": object
         */
        // If it is a printable value such: boolean, string, null
        if (Utils.isValuePrintable(json[k])) {
          return (
            <>
              <div
                className="json-key-value-pair"
                data-path={ nextLocation }
              >
                { isNaN(k) && <span className="json-key">{ k }</span> }
                <span className={ `json-value ${valueType}` }>{ Utils.toPrintableValue(json[k]) }</span>
                </div>
            </>
          )
        }

        // Complex value of {} or []
        // Wrap the next object/array in json-key-{type}-pair div, then jump to deeper levels
        return (
          <div
            className={ `${Array.isArray(json[k]) ? `json-key-array-pair` : `json-key-value-pair`}` }
            data-path={ nextLocation }
          >
            { !Utils.isObjectEmpty(json[k]) && (
              <>
                <ExpandButton />
                <span className="json-key">{ k }</span>
              </>
            ) }
            <span className={ `json-value ${valueType}` }>
              { JsonToHTML({
                json: json[k],
                location: nextLocation,
              }) }
            </span>
          </div>
        );
      }) }
    </>
  );
}


/**
 * A memoizaed version of the JsonToHTML
 * Cache layer (object hash) prevents redundant re-rendering
 */
const JsonToHTMLMemo = memo(JsonToHTML, (prevProps, nextProps) => {
  // Calculate the object hash for `json` property against the current
  let prevJsonHash = Utils.calculateHash(prevProps.json);
  let nextJsonHash = Utils.calculateHash(prevProps.json);

  if (prevJsonHash === nextJsonHash) {
    return true;
  }
  // They do not match
  return false;
});

/**
 * Allow parent components to access the JSON Container in the DOM.
 * Cases uses are for highlighting the matches.
 */
const JsonTree = forwardRef(({ json, ...props }, ref) => {

  // For collapsing the objects
  useEffect(() => {

    const treeRef = ref.current;

    // Event listener for changes
    const toggle = (event) => {
      // A refernece to toggle button
      let toggleButton;
      // Try to find the toggleButton
      for (let target=event.target; target && target !== this; target = target.parentNode) {
        // loop parent nodes from the target to the delegation node
        if (target instanceof Element && target.matches(`.${TOGGLE_BUTTON_CLASSNAME}`)) {
          toggleButton = target;
          break;
        }
      }
      // Exit if no node was found (no match)
      if (!toggleButton) {
        return false;
      }
      // Toggle .collpase on the parent (json-array or json-object)
      Classie.toggleClass(toggleButton.parentElement, 'collapse');
    }
    // Add it
    treeRef.addEventListener('click', toggle);
    // Clean up the listener on unmount
    return () => treeRef.removeEventListener('click', toggle);
  });

  // Recursively render the tree
  // Every component from here is stateless to leverage efficient rendering.
  // Collapse state is not saved in React to avoid re-rendering child tree(s)
  return (
    <div className="json-tree" ref={ ref } { ...props }>
      <div className={`json-value ${Utils.toValueType(json)}`}>
        <JsonToHTMLMemo json={ json } root={true} />
      </div>
    </div>
  );

});

/**
 * Prop validation
 */
JsonTree.propTypes = {
  json: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired
}

export default JsonTree;