
import Homepage from "./components/HomePage"
import CreatePage from "./components/CreatePage"
import { Box, useColorModeValue } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Box minH={"1000vh"} bg={useColorModeValue("gray.100","gray.900")}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/create" element={<CreatePage/>}/>

        </Routes>
      </Box>
    </>
  )
}

export default App
