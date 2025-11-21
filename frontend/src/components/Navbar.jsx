import { Container,Flex,Link,Text,Button,HStack, useColorMode} from "@chakra-ui/react";
import { CiSquarePlus } from "react-icons/ci";
import { MdOutlineDarkMode, MdDarkMode} from "react-icons/md";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
      const {colorMode,toggleColorMode}=useColorMode()
      const navigate=useNavigate()
  return (
    <Container maxW={"1140px"} px={4} >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize={{base:"22",sm:"28"}}
          fontWeight="extrabold"
          onClick={() => navigate("/")}
        >
           <Link to={"/"}>Product Store </Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
            <Link to={"/create"}>
                  <Button fontSize={20} onClick={() => navigate("/create")}>
                        <CiSquarePlus />
                  </Button>
            </Link>
            <Link to={"/create"}>
                  <Button fontSize={20} onClick={toggleColorMode}>
                        {colorMode==="light"?<MdDarkMode/>:<MdOutlineDarkMode />}
                  </Button>
            </Link>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
