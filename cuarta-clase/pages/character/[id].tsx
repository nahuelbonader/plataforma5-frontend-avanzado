import { useQuery } from "urql";
import { useRouter } from "next/router";
import { Status } from "../../components/Status";
import { CircleIcon } from "../../commons/CircleIcon";
import { Stack, Text, Image, List, ListItem } from "@chakra-ui/react";
import Link from "next/link";

const SingleCharacterQuery = `
  query ($characterId: ID!) {
    character(id: $characterId) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
      }
      location {
        name
      }
      image
      episode {
        id
        name
      }
      created
    }
  }
`;

function CharacterPage() {
  // next hooks
  const { query } = useRouter();

  // constants
  const { id } = query;
  console.log("\n ~ CharacterPage ~ id", id);

  // urql hooks
  const [result] = useQuery({
    query: SingleCharacterQuery,
    variables: { characterId: id },
  });

  const { data, fetching: isLoading, error } = result;
  console.log("\n ~ CharacterPage ~ data", data);

  if (isLoading || error) {
    return null;
  }

  const {
    created,
    episode,
    gender,
    image,
    location,
    name,
    origin,
    species,
    status,
    type,
  } = data.character;

  return (
    <Stack flexDirection="column" alignItems="flex-start" spacing={20}>
      <Stack flexDirection="row" alignItems="center">
        <Image src={image} alt={name} borderRadius={8} />

        <Stack spacing={10} width={500} paddingLeft={20}>
          <Stack>
            <Text color="white" fontSize="3xl" fontWeight="extrabold">
              {name}
            </Text>
            <Status species={species} status={status} />
          </Stack>

          <Stack spacing={0}>
            <Text color="white" fontSize="xl">
              Type: {type}
            </Text>
            <Text color="white" fontSize="xl">
              Gender: {gender}
            </Text>
            <Text color="white" fontSize="xl">
              Origin: {origin.name}
            </Text>
            <Text color="white" fontSize="xl">
              Location: {location.name}
            </Text>
            <Text color="white" fontSize="xl">
              Created: {created.split("T")[0]}
            </Text>
          </Stack>
        </Stack>
      </Stack>

      <Stack>
        <Text color="white" fontSize="3xl" fontWeight="extrabold">
          Episodes
        </Text>

        <Stack paddingLeft={4}>
          {episode.map((e) => (
            <Stack flexDirection="row" alignItems="center" spacing={0}>
              <CircleIcon boxSize={3} color="gray.500" marginRight={3} />
              <Link href={`/episodes/${e.id}`}>
                <Text
                  color="white"
                  fontSize="lg"
                  cursor="pointer"
                  marginTop={0}
                  _hover={{ color: "cyan.100" }}
                >
                  {e.name}
                </Text>
              </Link>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default CharacterPage;
