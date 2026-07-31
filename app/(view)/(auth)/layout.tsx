import Navbar from '@/components/common/navbar';
import {CompactFooter} from '@/components/common/footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <CompactFooter />
    </>
  );
}