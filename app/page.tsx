import Header from "@/components/header";

export default function Home() {
  return (
    <div>
      {/* HEADER */}
      <Header />
      <div className="p-5">
        {/* TEXTO */}
        <h2 className="text-xl font-bold">Olá, Gustavo!</h2>
      </div>
    </div>
  );
}
