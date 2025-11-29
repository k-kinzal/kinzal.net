import { Text } from "@kinzal-net/ui";

interface CopyrightProps {
  year: number;
}

export function Copyright({ year }: CopyrightProps) {
  return (
    <Text variant="inherit" className="leading-footer m-0">
      &copy; 2005-{year}, kinzal.net
    </Text>
  );
}
