import { Text } from "@kinzal-net/ui";

/**
 * Copyright notice text.
 *
 * @remarks
 * Displays the copyright notice from 2005 to current year.
 */
export function Copyright() {
  const year = new Date().getFullYear();
  return (
    <Text variant="inherit" className="leading-footer m-0">
      &copy; 2005-{year}, kinzal.net
    </Text>
  );
}
