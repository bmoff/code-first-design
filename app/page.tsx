import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Code-First-Design</h1>
        <p className="text-muted-foreground mb-8">
          A framework for prototyping and promoting UI components
        </p>
        <Link 
          href="/proto"
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90"
        >
          Open Design System
        </Link>
      </div>
    </div>
  );
}

