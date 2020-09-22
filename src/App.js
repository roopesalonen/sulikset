import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/layout/Header';
import Search from './components/layout/Search';
import Jobs from './components/Jobs';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Weather from './components/Weather'

function App() {

  const initJobs = []
  const [jobs, setJobs] = useState(initJobs);

  const [filterText, setFilterText] = useState('');
  const [showAll, setShowAll] = useState(true);

  const handleFilter = (filteringText) => {
    setFilterText(filteringText);
    if(filteringText === ''){
    }
    else{
      setShowAll(false);
    }
  }
    const handleComplete = (job) =>{
      jobs.map((checkJob) =>{

        if (checkJob.id === job.id){
          checkJob.completed = !checkJob.completed
        }
      });
      setJobs([...jobs]);
  }
  const jobsToShow = showAll
    ? jobs
    : jobs.filter(job => job.tyotehtava.toUpperCase().includes(filterText.toUpperCase()))
  

    useEffect(() => {
    fetch('https://gis.vantaa.fi/rest/tyopaikat/v1/kaikki')
      .then(response => response.json())
      .then(json => setJobs([...json]));
  }, []);


  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/weather">
            <Weather />
            </Route>
            <Route path="/">
            <Search onFilter={handleFilter} />
            <Jobs onCompleted={handleComplete} jobs={jobsToShow} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;