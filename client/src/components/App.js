import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Authentication from "./Authentication";
import Register from "./Register";


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/" component={Authentication} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
