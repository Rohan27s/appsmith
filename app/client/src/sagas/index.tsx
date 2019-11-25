import { all, spawn } from "redux-saga/effects";
import pageSagas from "sagas/PageSagas";
import { fetchWidgetCardsSaga } from "./WidgetSidebarSagas";
import { watchActionSagas } from "./ActionSagas";
import widgetOperationSagas from "./WidgetOperationSagas";
import errorSagas from "./ErrorSagas";
import configsSagas from "./ConfigsSagas";
import applicationSagas from "./ApplicationSagas";
import { watchDatasourcesSagas } from "./DatasourcesSagas";
import initSagas from "./InitSagas";
import bindingsSagas from "./BindingsSagas";
import watchActionWidgetMapSagas, {
  watchPropertyAndBindingUpdate,
} from "./ActionWidgetMapSagas";

export function* rootSaga() {
  yield all([
    spawn(initSagas),
    spawn(pageSagas),
    spawn(fetchWidgetCardsSaga),
    spawn(watchActionSagas),
    spawn(widgetOperationSagas),
    spawn(errorSagas),
    spawn(configsSagas),
    spawn(watchDatasourcesSagas),
    spawn(applicationSagas),
    spawn(bindingsSagas),
    spawn(watchActionWidgetMapSagas),
    spawn(watchPropertyAndBindingUpdate),
  ]);
}
