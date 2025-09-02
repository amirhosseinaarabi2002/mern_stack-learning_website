import { useRoutes } from "react-router-dom";
import routes from "./routes";

function App() {
  const router = useRoutes(
    routes.map((route) => ({
      ...route,
      element: <route.element />,
    }))
  );

  return <div>{router}</div>;
}

export default App;
