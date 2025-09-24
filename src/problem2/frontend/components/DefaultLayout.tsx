import { Navbar } from "@/components/Navbar";

interface DefaultLayoutProps {
  children: React.ReactNode;
}
export function DefaultLayout(props: DefaultLayoutProps) {
  const { children } = props;

  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl p-6 flex-grow border">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <div className="flex items-center gap-2">
          <span className="text-default-600"> 99Tech </span>
          <p className="text-primary"> Problem2 </p>
        </div>
      </footer>
    </div>
  )
}
