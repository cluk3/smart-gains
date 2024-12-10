import { Container } from '~/components/layout';
import { H1, Muted } from '~/components/ui/typography';

export default function Modal() {
  return (
    <Container className="items-center justify-center gap-y-4 ">
      <H1 className="text-center">Modal</H1>
      <Muted className="text-center">This is a modal screen.</Muted>
    </Container>
  );
}
