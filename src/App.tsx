import { UserProvider } from "./shared/providers/userProvider";
import { GlobalRouter } from "./Router";

function App() {
  return (
    <UserProvider>
      <GlobalRouter />
    </UserProvider>
  );
}

export default App;
