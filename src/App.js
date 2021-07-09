import './App.css';
// import { Header } from './components/main-page/header/Header';
import { MainInfo } from './components/main-page/MainInfo';
import { QuestionsPage } from './components/questions-page/QuestionsPage';
import { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { DownloadAppPage } from './components/download-app-page/DownloadAppPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={MainInfo} />
          <Route exact path='/questions/:questionNumber?' component={QuestionsPage} />
          <Route exact path='/download' component={DownloadAppPage} />
          <Route path='*' component={Error} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
