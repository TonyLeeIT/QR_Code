import React from "react";
import { Route, Switch } from "react-router-dom";
import { QrPage } from "./pages/qrcode/QrPage";
import { StaticQrPage } from "./pages/static_qr/StaticQrPage";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/dynamic/qr-code" component={QrPage} />
      <Route exact path="/static/qr-code" component={StaticQrPage} />
    </Switch>
  );
};
