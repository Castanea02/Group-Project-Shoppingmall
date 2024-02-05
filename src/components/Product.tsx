import { Box, Image, Badge } from "@chakra-ui/react";

/**클릭 전 제품 그림 */
function Product(data: any) {
  const property = {
    imageUrl: data.productInfo.imageUrl,
    imageAlt: data.productInfo.title,
    title: data.productInfo.title,
    formattedPrice: data.productInfo.price,
  };

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={property.imageUrl} alt={property.imageAlt} w={300} h={150} />
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            호에엥 신상품!
          </Badge>
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {property.title}
        </Box>
        <Box>
          {property.formattedPrice}
          <Box as="span" color="gray.600" fontSize="sm">
            원!
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Product;
