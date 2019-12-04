import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// user components
import Home from "./components/user/Home";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
//website components
import WebsiteEdit from "./components/website/WebsiteEdit";
import WebsiteList from "./components/website/WebsiteList";
import WebsiteNew from "./components/website/WebsiteNew";
//page components
import PageEdit from "./components/page/PageEdit";
import PageList from "./components/page/PageList";
import PageNew from "./components/page/PageNew";
// widget
import WidgetChooser from "./components/widget/WidgetChooser";
import WidgetList from "./components/widget/WidgetList";
import WidgetEdit from "./components/widget/WidgetEdit";

function App() {
  const [widgets, setWidgets] = useState([
    {
      _id: "123",
      widgetType: "HEADING",
      pageId: "321",
      size: 2,
      text: "GIZMODO"
    },
    {
      _id: "234",
      widgetType: "HEADING",
      pageId: "321",
      size: 4,
      text: "Lorem ipsum"
    },
    {
      _id: "345",
      widgetType: "IMAGE",
      pageId: "321",
      width: "100%",
      url:
        "https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg"
    },
    {
      _id: "567",
      widgetType: "HEADING",
      pageId: "321",
      size: 4,
      text: "Lorem ipsum"
    },
    {
      _id: "678",
      widgetType: "YOUTUBE",
      pageId: "321",
      width: "100%",
      url: "https://youtu.be/AM2Ivdi9c4E"
    }
  ]);

  // Get Widgets by page id
  const getWidgets = pid => {
    return widgets.filter(widget => widget.pageId === pid);
  };

  // Get Widget by widget id
  const getWidget = wgid => {
    for (let widget of widgets) {
      if (widget._id === wgid) {
        return widget;
      }
    }
  };

  // add Widget
  const addWidget = newWidget => {
    setWidgets([...widgets, newWidget]);
  };

  // remove Widget
  const removeWidget = wgid => {
    setWidgets(widgets.filter(widget => widget._id !== wgid));
  };

  // update Widget
  const updateWidget = newWidget => {
    setWidgets(
      widgets.map(widget => {
        if (widget._id === newWidget._id) {
          return newWidget;
        } else {
          return widget;
        }
      })
    );
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login users={users} />
        </Route>
        <Route exact path="/register">
          <Register users={users} addUser={addUser} />
        </Route>
        <Route exact path="/user/:uid">
          <Profile users={users} updateUser={updateUser} />
        </Route>
        <Route exact path="/user/:uid/website">
          <WebsiteList getWebsites={getWebsites} />
        </Route>
        <Route exact path="/user/:uid/website/new">
          <WebsiteNew getWebsites={getWebsites} addWebsite={addWebsite} />
        </Route>
        <Route exact path="/user/:uid/website/:wid">
          <WebsiteEdit
            getWebsites={getWebsites}
            getWebsite={getWebsite}
            removeWebsite={removeWebsite}
            updateWebsite={updateWebsite}
          />
        </Route>
        <Route exact path="/user/:uid/website/:wid/page">
          <PageList getPages={getPages} />
        </Route>
        <Route exact path="/user/:uid/website/:wid/page/new">
          <PageNew addPage={addPage} />
        </Route>
        <Route exact path="/user/:uid/website/:wid/page/:pid">
          <PageEdit
            getPage={getPage}
            removePage={removePage}
            updatePage={updatePage}
          />
        </Route>
        <Route exact path="/user/:uid/website/:wid/page/:pid/widget">
          <WidgetList getWidgets={getWidgets} />
        </Route>
        <Route exact path="/user/:uid/website/:wid/page/:pid/widget/new">
          <WidgetChooser addWidget={addWidget} />
        </Route>
        <Route exact path="/user/:uid/website/:wid/page/:pid/widget/:wgid">
          <WidgetEdit
            getWidget={getWidget}
            removeWidget={removeWidget}
            updateWidget={updateWidget}
          />
        </Route>
        <Route path="/">
          <Login users={users} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
