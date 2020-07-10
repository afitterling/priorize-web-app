import React, { useEffect, useCallback, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { 
  Label,
  Header,
  Icon
} from 'semantic-ui-react'

function App() {

  const [items, setItems] = useState([]);

  const fetchData = useCallback(
    async () => {
      const r = await fetch('./api/data.json');
      const json = await r.json();
      setItems(json.items);
    }, [setItems]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <Header as='h1'>Priorize App</Header>
      <Router>
        <div>
          <Switch>
            <Route path="/">
              <Home items={items} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}


function Home({ items }) {
  return (
    <div>
      <Header as='h3'>Manage Activities</Header>
      <div>
        {items.map(i => {
          return (<Label key={i.id} as='a' color='blue' image>
            <i>{i.label}</i>
            <Label.Detail>
              {i.name} <Icon name='delete' />
            </Label.Detail>
          </Label>)
        })}
        <Label color='black'>
          <Icon name='add' />Add
        </Label>
      </div>
    </div>);
}

export default App;
