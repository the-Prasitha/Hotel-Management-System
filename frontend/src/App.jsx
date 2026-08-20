import { BrowserRouter, Routes, Route } from "react-router-dom";

import HotelList from "./pages/HotelList";
import AddHotel from "./pages/AddHotel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HotelList />} />

        <Route
          path="/hotels/add"
          element={<AddHotel />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;