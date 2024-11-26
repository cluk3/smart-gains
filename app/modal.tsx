import { Link, router } from 'expo-router';

import { ScreenContent } from '~/components/ScreenContent';
export default function Modal() {
  const isPresented = router.canGoBack();
  return (
    <>
      <ScreenContent path="app/modal.tsx" title="Modal" />
      {!isPresented && <Link href="../">Back Home</Link>}
    </>
  );
}
