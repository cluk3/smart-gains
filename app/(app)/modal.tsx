import { Screen } from '~/components/screen';
import { H1, Muted } from '~/components/ui/typography';

export default function Modal() {
  return (
    <Screen contentContainerClassName="flex-1 items-center justify-center">
      <H1 className="text-center">Modal</H1>
      <Muted className="text-center">This is a modal screen.</Muted>
    </Screen>
  );
}
