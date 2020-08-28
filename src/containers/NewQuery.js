import React, { useState } from 'react';
import UseAnimations from "react-useanimations";
import AnimationsLoading from 'react-useanimations/lib/loading';
import { ReactComponent as JSONLogo } from '../assets/svg/json.svg';
import FileInput from '../components/common/FileInput';
import Visualizer from './Visualizer';
import { Center } from '../layouts';

function NewQuery() {

  const [jsonFile, setJsonFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBitcoinUnconfirmedTx = () => {

    setLoading(true);

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
    .catch();

  }

  const handleJsonFile = (event) => {
    setLoading(true);

    const reader =new FileReader();

    reader.addEventListener('load', ({ target }) => {
      try {
        // Try parsing as JSON
        setJsonFile(JSON.parse(target.result));
        setLoading(false);
      } catch (e) {}
    })
    // Load the file
    reader.readAsText(event.target.files[0]);
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
      <button className="primary" onClick={ fetchBitcoinUnconfirmedTx }>Bitcoin Unconfimred Txs</button>
    </Center.Content>
  );

}

export default NewQuery;