import { Stack, Text } from "@chakra-ui/react";
import { CircleIcon } from "../commons/CircleIcon";

type IProps = {
  status: string;
  species: string;
};

export function Status({ status, species }: IProps) {
  return (
    <Stack
      flexDirection="row"
      spacing={0}
      alignItems="center"
      alignSelf="flex-start"
    >
      <CircleIcon
        color={status == "Alive" ? "green.200" : "red.200"}
        boxSize={4}
        marginRight={3}
      />

      <Text color="white">
        {status} - {species}
      </Text>
    </Stack>
  );
}
