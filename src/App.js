import { Sidebar } from "./components/sidebar/Sidebar";
import { BrowserRouter, Route } from "react-router-dom";
import { TopNav } from "./components/topnav/TopNav";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ThemeAction } from "./redux/actions/ThemeAction";
import { Routes } from "./Routes";

function App() {
  const dispatch = useDispatch();
  const themeReducer = useSelector((state) => state.ThemeReducer);

  useEffect(() => {
    const themeClass = localStorage.getItem("themeMode");
    const colorClass = localStorage.getItem("colorMode");

    if (themeClass) dispatch(ThemeAction.setMode(themeClass));
    if (colorClass) dispatch(ThemeAction.setMode(colorClass));
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
            <Sidebar {...props} />
            <div className="layout__content">
              <TopNav />
              <div className="layout__content-main">
                <Routes />
              </div>
            </div>
          </div>
        )}
      />
    </BrowserRouter>
  );
}

export default App;
