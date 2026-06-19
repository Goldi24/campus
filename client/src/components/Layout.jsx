import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <header>
        <h1>CampusConnect</h1>
      </header>

      <Navbar />

      <main>{children}</main>

      <footer>
        <p>University Portal</p>
      </footer>
    </>
  );
}

export default Layout;