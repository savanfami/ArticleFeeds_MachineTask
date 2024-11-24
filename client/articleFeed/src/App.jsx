import { UserLayout } from "./layout/UserLayout";
import { ErrorBoundary } from "./components/common/errorBoundary";
function App() {
  return (
    <ErrorBoundary>
      <>
        <UserLayout />
      </>
    </ErrorBoundary>
  );
}

export default App;
