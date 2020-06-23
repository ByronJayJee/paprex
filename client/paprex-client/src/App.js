import React, { useState, useEffect } from 'react';
import TaskAnswers from './components/task_answers';
//import logo from './logo.svg';
import logo from './paprex_logo_white.svg';
import './App.css';

function App() {
  
  const queryTypeArray = ['Generate Full Report', 'Single Query'];
  const singleQueryArray = ['How long is the incubation period for the virus?', 'Do geographic variations exist in the genome of lassa?', 'Type Custom Query'];

  const [queryType, setQueryType] = useState('');
  const [singleQuery, setSingleQuery] = useState('');
  const [customQuery, setCustomQuery] = useState('');
  const [pmidInterest, setPmidInterest] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [currentServerStatus, setServerStatus] = useState('...Waiting for PaPreX Server...');
  const [currentPmidList, setPmidList] = useState([{pmid: 23456789}]);
  const [currentQAResults, setQAResults] = useState('...Waiting for results...');
  const [currentQAResultsJSON, setQAResultsJSON] = useState([{'task': 'Test Task', 'questions': [{'question': 'Test Question?', 'summary_answer': '', 'summary_context': '', 'results': [{'context': 'test context', 'answer': 'test answer', 'start_index': 2, 'end_index': 4, 'title': 'test title', 'pmid': 123456789}]}]}]);

  const handleFormSubmit = (event) => {
    console.log(`
      QueryType: ${queryType}
      SingleQuery: ${singleQuery}
    `);

    event.preventDefault();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/lassa_test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: 'test send' }),
    });
    //const body = await response.text();
    const json = await response.json();
    
    setQAResults(json.body);
    setQAResultsJSON(json.body_json);
  };

  useEffect(() => {
    /*
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
    */
    fetch('/api/helloserver').then(res => res.json()).then(data => {
      setServerStatus(data.text);
      console.log(data.text)
    });
  }, []);

  // This is not great. I should actually build up the HTML and not use dangerouslySetInnerHTML
  // <div dangerouslySetInnerHTML={{__html: currentQAResults}} />
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{currentServerStatus}</p>
	<p><u>Pa</u>ndemic <u>Pre</u>paredness for Pathogen <u>X</u></p>
	<form onSubmit={handleSubmit}>
	  <label>
            Query Type:
            <select
              name="queryType"
              value={queryType}
              onChange={e => setQueryType(e.target.value)}
              required>
              <option key=""></option>
              {queryTypeArray.map(qType => (
                <option key={qType}>{qType}</option>
              ))}
            </select>
          </label>
	  <label>
            Single Query:
            <select
              name="singleQuery"
              value={singleQuery}
              onChange={e => setSingleQuery(e.target.value)}
              required>
              <option key=""></option>
              {singleQueryArray.map(qType => (
                <option key={qType}>{qType}</option>
              ))}
            </select>
          </label>
	  <label>
            Enter Custom Query:
            <input
              name="customQuery"
              type="text"
              value={customQuery}
              onChange={e => setCustomQuery(e.target.value)}
              />
          </label>
	  <label>
            Enter PMIDs of Interest:
            <input
              name="pmidInterest"
              type="text"
              value={pmidInterest}
              onChange={e => setPmidInterest(e.target.value)}
              />
          </label>

	  <button type="submit">Submit Query</button>
	</form>
	<TaskAnswers task_answers={currentQAResultsJSON} />
      </header>
    </div>
  );
}

export default App;
