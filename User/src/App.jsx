import Header from "./components/Header";
import AppRoutes from "./components/AppRoutes";
import Footer from "./components/Footer";
function App() {
  return (
    <main>
      <Header />
      <div className="min-h-175">
        <AppRoutes />
      </div>
      <Footer />
    </main>
  );
}

export default App;
