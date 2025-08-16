import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to My App</h1>
      <p className="mt-4 text-lg">This is the home page of your application.</p>
      <Image src="/logo.png" alt="Logo" width={150} height={150} />
    </main>
  );
}
