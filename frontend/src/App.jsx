import { BrowserRouter, Routes, Route } from "react-router-dom";

import HotelList from "./pages/HotelList";
import AddHotel from "./pages/AddHotel";
import EditHotel from "./pages/EditHotel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HotelList />} />

        <Route
          path="/hotels/add"
          element={<AddHotel />}
        />

        <Route
          path="/hotels/:id/edit"
          element={<EditHotel />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;