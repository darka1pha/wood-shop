import { Flex } from "@chakra-ui/layout";
import ContainerItem from "./ContainerItem";

const Container = () => {
  return (
    <Flex
      w="100%"
      justifyContent="center"
      alignItems="center"
      mt="5rem"
      p={{ base: ".5rem", md: "1rem" }}>
      <Flex flexWrap="wrap" w="100%" maxW="1920px">
        <ContainerItem
          title="صندلی"
          image_url="https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjB8fGNoYWlyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        />
        <ContainerItem
          title="میز"
          image_url="https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGVza3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        />
        <ContainerItem
          title="تخت خواب"
          image_url="https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGJlZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        />
        <ContainerItem
          title="قفسه"
          image_url="https://images.unsplash.com/photo-1576069353653-21a2b29e3bc7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2hlbGZ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        />
        <ContainerItem
          title="مبل"
          image_url="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y291Y2h8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        />
      </Flex>
    </Flex>
  );
};

export default Container;
