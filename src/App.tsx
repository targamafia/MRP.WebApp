import { UserProvider } from "@/shared/providers/userProvider";
import { GlobalRouter } from "@/Router";
import QueryProvider from "@/shared/providers/queryProvider";
import { MUIThemeProvider } from "./shared/providers/muiThemeProvider";

function App() {
  return (
    <MUIThemeProvider>
      <UserProvider>
        <QueryProvider>
          <GlobalRouter />
        </QueryProvider>
      </UserProvider>
    </MUIThemeProvider>
  );
}

export default App;
