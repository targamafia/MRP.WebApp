import { UserProvider } from "@/shared/providers/userProvider";
import { GlobalRouter } from "@/Router";
import QueryProvider from "@/shared/providers/queryProvider";

function App() {
  return (
    <UserProvider>
      <QueryProvider>
        <GlobalRouter />
      </QueryProvider>
    </UserProvider>
  );
}

export default App;
