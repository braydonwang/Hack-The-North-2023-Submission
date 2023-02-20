import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { SettingsIcon, ChatIcon, SunIcon } from "@chakra-ui/icons";

export default function CustomTag({ event, size }) {
  return event.event_type === "workshop" ? (
    <Tag
      width="110px"
      size={size}
      variant="solid"
      colorScheme="purple"
      paddingTop="5px"
      paddingBottom="5px"
    >
      <TagLeftIcon as={SettingsIcon} />
      <TagLabel>Workshop</TagLabel>
    </Tag>
  ) : event.event_type === "tech_talk" ? (
    <Tag
      width="105px"
      size="md"
      variant="solid"
      colorScheme="green"
      paddingTop="5px"
      paddingBottom="5px"
    >
      <TagLeftIcon as={ChatIcon} />
      <TagLabel>Tech Talk</TagLabel>
    </Tag>
  ) : (
    <Tag
      width="90px"
      size="md"
      variant="solid"
      colorScheme="orange"
      paddingTop="5px"
      paddingBottom="5px"
    >
      <TagLeftIcon as={SunIcon} />
      <TagLabel>Activity</TagLabel>
    </Tag>
  );
}
