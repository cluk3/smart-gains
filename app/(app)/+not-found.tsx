import { Center } from '~/components/layout';
import { H1, Muted } from '~/components/ui/typography';

export default function NotFound() {
  return (
    <Center className="gap-y-4">
      <H1 className="text-center">404</H1>
      <Muted className="text-center">This page could not be found.</Muted>
    </Center>
  );
}
