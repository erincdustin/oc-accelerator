import {
  Button,
  Card,
  CardBody,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Spinner,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  BuyerProduct,
  ListPageWithFacets,
  Me,
} from "ordercloud-javascript-sdk";
import { parse } from "querystring";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Pagination from "../shared/pagination/Pagination";
import FilterSearchMenu, {
  ServiceListOptions,
} from "../shared/search/SearchMenu";
import FacetList from "./facets/FacetList";
import ProductCard from "./ProductCard";

export interface ProductListProps {
  renderItem?: (product: BuyerProduct) => JSX.Element;
}

const ProductList: FunctionComponent<ProductListProps> = ({ renderItem }) => {
  const { catalogId, categoryId } = useParams<{
    catalogId: string;
    categoryId: string;
  }>();
  const [productList, setProductList] =
    useState<ListPageWithFacets<BuyerProduct>>();
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const searchTerm = useMemo(() => {
    return searchParams.get("search") || undefined;
  }, [searchParams]);

  const currentPage = useMemo(() => {
    return Number(searchParams.get("page")) || 1;
  }, [searchParams]);

  const filters = useMemo(() => {
    const filtersObj = {} as { [key: string]: string | string[] };
    for (const key of searchParams.keys()) {
      if (!["search", "page", "pageSize"].includes(key)) {
        filtersObj[key] = searchParams.getAll(key);
      }
      searchParams.getAll(key);
    }
    return filtersObj;
  }, [searchParams]);

  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      const result = await Me.ListProducts({
        catalogID: catalogId,
        categoryID: categoryId,
        filters,
        pageSize: 20, // Adjust as needed
        page: currentPage,
        search: searchTerm,
      });
      setProductList(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [catalogId, categoryId, currentPage, filters, searchTerm]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleRoutingChange = useCallback(
    (queryKey: string, resetPage?: boolean, index?: number) =>
      (value?: string | boolean | number) => {
        const searchParams = new URLSearchParams(location.search);
        const hasPageParam = Boolean(searchParams.get("page"));
        const isFilterParam = !["search", "page", "pageSize"].includes(
          queryKey
        );

        // filters can have multiple values for one key i.e. SpecCount > 0 AND SpecCount < 2
        const prevValue = isFilterParam
          ? searchParams.getAll(queryKey)
          : searchParams.get(queryKey);
        if (!value && !prevValue) return;
        if (value) {
          if (!isFilterParam && prevValue !== value) {
            searchParams.set(queryKey, value.toString());
          } else if (isFilterParam) {
            prevValue?.includes(value.toString())
              ? searchParams.delete(queryKey, value.toString())
              : searchParams.append(queryKey, value.toString());
          }
          if (hasPageParam && resetPage) searchParams.delete("page"); // reset page on filter change
        } else if (prevValue) {
          searchParams.delete(
            queryKey,
            index !== undefined ? prevValue[index] : undefined
          );
        }

        navigate(
          { pathname: location.pathname, search: searchParams.toString() },
          { state: { shallow: true } }
        );
      },
    [location.pathname, location.search, navigate]
  );

  const listOptions = useMemo(() => {
    return parse(location.search.slice(1)) as ServiceListOptions;
  }, [location.search]);

  if (loading) {
    return (
      <Center h="75vh">
        <Spinner thickness="10px" size="xl" color="secondary.300" />
      </Center>
    );
  }

  if (productList?.Items && productList.Items.length === 0) {
    return (
      <Center h="75vh">
        <Heading as="h2" size="md">
          No products found
        </Heading>
      </Center>
    );
  }

  return (
    <>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filters</DrawerHeader>
          <DrawerBody>
            <FilterSearchMenu
              listOptions={listOptions}
              handleRoutingChange={handleRoutingChange}
            />
            <FacetList
              facets={productList?.Meta?.Facets}
              onChange={handleRoutingChange}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Grid
        gridTemplateColumns={{ md: "300px 1fr" }}
        gap="4"
        alignItems="flex-start"
      >
        <Card
          as={GridItem}
          position="sticky"
          top="20"
          display={{ base: "none", md: "block" }}
        >
          <CardBody as={VStack} alignItems="stretch">
            <FilterSearchMenu
              listOptions={listOptions}
              handleRoutingChange={handleRoutingChange}
            />
            <FacetList
              facets={productList?.Meta?.Facets}
              onChange={handleRoutingChange}
            />
          </CardBody>
        </Card>
        <GridItem display={{ base: "block", md: "none" }}>
          <Button aria-label="Open Filters" onClick={onOpen} mb={4} size="sm">
            Refine your search
          </Button>
        </GridItem>
        <SimpleGrid
          as={GridItem}
          w="full"
          gridTemplateColumns="repeat(auto-fill, minmax(270px, 1fr))"
          spacing={4}
        >
          {productList?.Items?.map((p) => (
            <React.Fragment key={p.ID}>
              {renderItem ? renderItem(p) : <ProductCard product={p} />}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </Grid>

      {!!productList?.Meta?.TotalPages && productList.Meta.TotalPages > 1 && (
        <Center>
          <Pagination
            page={currentPage}
            totalPages={productList.Meta.TotalPages}
            onChange={handleRoutingChange("page")}
          />
        </Center>
      )}
    </>
  );
};

export default ProductList;
