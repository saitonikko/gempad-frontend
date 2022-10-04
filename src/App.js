import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './assets/styles/styles.scss';
import Layout from './layouts';
import Presales from './pages/presales';
import SpecialSales from './pages/special-sales';
import Launchpad from './pages/launchpad';
import Locks from './pages/locks';
import Tools from './pages/tools';


function App() {
  const [page, setPage] = useState(0);

  return (
    <>
      <Layout page={page}>
        <Routes>
          <Route index element={<Link to="/presales" />} />
          <Route path="presales" element={<Link to="/presales/explore" />} />
          <Route path="presales/:tab" element={<Presales setPage={setPage} />} />
          <Route path="special_sales" element={<Link to="/special_sales/explore" />} />
          <Route path="special_sales/:tab" element={<SpecialSales setPage={setPage} />} />
          <Route path="launchpad" element={<Link to="/launchpad/create_presale" />} />
          <Route path="launchpad/:tab" element={<Launchpad setPage={setPage} />} />
          <Route path="locks" element={<Link to="/locks/create_lock" />} />
          <Route path="locks/:tab" element={<Locks setPage={setPage} />} />
          <Route path="tools" element={<Link to="/tools/airdrop" />} />
          <Route path="tools/:tab" element={<Tools setPage={setPage} />} />
        </Routes>
      </Layout>
      <ToastContainer autoClose={2000} />
    </>

  );
}

export default App;
