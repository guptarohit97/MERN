import { Container, Text, VStack, SimpleGrid, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const Homepage = () => {
  const { fetchProducts, products } = useProductStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts();
      setLoading(false);
    };
    fetchData();
  }, [fetchProducts]);

  const { deleteProduct } = useProductStore();
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    const { success, message } = await deleteProduct(id);
    if (success) alert(message);
    else alert("Error: " + message);
  };
  if (loading) {
    return <Text textAlign="center" mt={8}>Loading products...</Text>;
  }

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r,cyan.400,blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"}>
          {products.map((product)=>(
            <ProductCard key={product._id} product={product} handleDelete={handleDelete}/>
          ))}
        </SimpleGrid>
        {products.length===0 && (<Text
          fontSize="xl"
          textAlign={"center"}
          fontWeight={"bold"}
          color={"gray.500"}
        >
          No Products Found...{" "}
          <Link to={"/create"}>
            <Text
              as="span"
              color="blue.500"
              _hover={{ textDecoration: "underline" }}
            >
              Create Product
            </Text>
          </Link>
        </Text>)}
        
      </VStack>
    </Container>
  );
};

export default Homepage;
