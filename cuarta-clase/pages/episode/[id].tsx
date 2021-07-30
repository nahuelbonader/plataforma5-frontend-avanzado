import Link from "next/link";
import { useQuery } from "urql";
import { useRouter } from "next/router";
import { Stack, Text, Image, Box, Grid, GridItem } from "@chakra-ui/react";

// queries
import { SingleEpisodeQuery } from "../../queries";

function CharacterPage() {
  // next hooks
  const { query } = useRouter();

  // constants
  const { id } = query;

  // urql hooks
  const [result] = useQuery({
    query: SingleEpisodeQuery,
    variables: { episodeId: id },
  });

  const { data, fetching: isLoading, error } = result;

  if (isLoading || error) {
    return null;
  }

  const { characters, name, air_date } = data.episode;

  return (
    <Stack flexDirection="column" alignItems="center" spacing={20} width={1000}>
      <Stack>
        <Text color="white" fontSize="5xl" fontWeight="extrabold">
          {name}
        </Text>
        <Text color="white" fontSize="lg">
          Air Date: {air_date.split("T")[0]}
        </Text>
      </Stack>

      <Stack spacing={5}>
        <Text color="white" fontSize="4xl" fontWeight="extrabold">
          Characters
        </Text>

        <Grid
          templateRows="repeat(3, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        >
          {characters.map((c) => (
            <GridItem key={c.id}>
              <Link href={`/character/${c.id}`}>
                <Stack
                  flexDirection="column"
                  alignItems="center"
                  cursor="pointer"
                >
                  <Box marginRight={3} marginBottom={1}>
                    <Image
                      src={c.image}
                      alt={c.name}
                      borderRadius={8}
                      width={20}
                      transition="all 400ms ease"
                      _hover={{ transform: "translateY(-1px)" }}
                    />
                  </Box>
                  <Text
                    color="white"
                    fontSize="lg"
                    _hover={{ color: "cyan.300" }}
                  >
                    {c.name}
                  </Text>
                </Stack>
              </Link>
            </GridItem>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}

export default CharacterPage;
