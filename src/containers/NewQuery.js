import React, { useState } from 'react';
import UseAnimations from "react-useanimations";
import AnimationsLoading from 'react-useanimations/lib/loading';
import { ReactComponent as JSONLogo } from '../assets/svg/json.svg';
import FileInput from '../components/common/FileInput';
import Visualizer from './Visualizer';
import { Center } from '../layouts';
import ErrorMessage from '../components/common/ErrorMessage';

function NewQuery() {

  const [jsonFile, setJsonFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchBitcoinUnconfirmedTx = () => {

    setLoading(true);
    setError(false);

    fetch(`https://cors-anywhere.herokuapp.com/https://blockchain.info/unconfirmed-transactions?format=json`, {
      headers: {
        'X-Requested-With': 'fetch'
      }
    })
    .then(res => res.json())
    .then(json => {

      setJsonFile(json);
      setLoading(false);

    })
    .catch(err => {
      setLoading(false);
      setError(err);
    });

  }

  const handleJsonFile = (event) => {

    setLoading(true);
    setError(false);

    const [file] = event.target.files;

    if (file.type !== "application/json") {
      return setError(new Error(`${file.name} is not a valid JSON`));
    }

    const reader = new FileReader();

    reader.addEventListener('load', ({ target }) => {
      try {
        // Try parsing as JSON
        setJsonFile(JSON.parse(target.result));
      } catch (e) {
        setError(new Error(`${file.name} is not a valid JSON`));
      }
    });
    // Loading state
    reader.addEventListener("loadend", setLoading(false));
    // Error handler
    reader.addEventListener("error", error => setError(error));
    // Load the file
    reader.readAsText(file);
  }


  if (loading) {
    return (
      <Center.Content>
        <UseAnimations animation={AnimationsLoading} size={ 56 }/>
      </Center.Content>
    );
  }

  if (jsonFile) {
    return (
      <Visualizer json={ jsonFile }/>
    )
  }

  return (
    <Center.Content>
      <form>
        <div>
          <FileInput className="primary" accept="application/json" onChange={ handleJsonFile }>
            <JSONLogo width="24px"/> <span>Select a JSON File</span>
          </FileInput>
        </div>
      </form>
      - OR -
      <button className="link" onClick={ fetchBitcoinUnconfirmedTx }>Bitcoin Unconfirmed Txs</button>
      { error && (
        <ErrorMessage error={error}/>
      ) }
    </Center.Content>
  );

}

export default NewQuery;