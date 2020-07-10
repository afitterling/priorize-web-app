import React, { useEffect, useCallback, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Label, Header } from 'semantic-ui-react'

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
      <Header as='h1'>First Header</Header>      <Router>
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


function Home({items}) {
  return (
    <div>
    { items.map( i => {
        console.log(i);
        return (<Label key={i.id} as='a' color='blue' image>
          <i>A</i>
          <Label.Detail>{i.name}</Label.Detail>
        </Label>)
    })}
    </div> );
}

export default App;
