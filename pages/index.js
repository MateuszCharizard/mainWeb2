export default function Home() {
  return (
    <div className="bg-black flex flex-col items-center justify-center min-h-screen p-4 select-none">
      {/* Header */}
      <h1 className="text-5xl font-bold text-white">Mnty Tech</h1>
      <p className="text-3xl font-semibold text-white mt-2">The BEST Tech</p>

      {/* Contact & Social Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 w-full max-w-4xl">

        {/* Social Media Section */}
        <div className="flex flex-col p-4 gap-2 rounded-lg">
          <p className="text-4xl font-semibold text-white p-1">Social Media:</p>

          {/* TikTok Link */}
          <div className="flex items-center gap-2">
            <img src="/tiktok.png" alt="TikTok" className="w-6 h-6" />
            <a
              href="https://www.tiktok.com/@mntytech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-semibold text-sky-500 hover:text-sky-600 hover:cursor-pointer p-1 underline"
            >
              TikTok
            </a>
          </div>

          {/* Instagram Link */}
          <div className="flex items-center gap-2">
            <img src="/instagram.png" alt="Instagram" className="w-6 h-6" />
            <a
              href="https://www.instagram.com/mnty.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-semibold text-pink-500 hover:text-pink-400 hover:cursor-pointer p-1 underline"
            >
              Instagram
            </a>
          </div>

          {/* YouTube Link */}
          <div className="flex items-center gap-2">
            <img src="/youtube.png" alt="YouTube" className="w-6 h-6" />
            <a
              href="https://www.youtube.com/@mntytech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-semibold text-red-600 hover:text-red-500 hover:cursor-pointer p-1 underline"
            >
              YouTube
            </a>
          </div>

        </div>
        {/* Contact Section */}
        <div className="flex flex-col p-4 gap-2 rounded-lg">
          <p className="text-4xl font-semibold text-white p-1">Contact:</p>

          <p className="text-2xl text-white font-semibold">
            E-Mail:{" "}
            <a
              href="mailto:mntytech@gmail.com"
              className="font-normal text-blue-400 underline ml-1"
            >
              mntytech@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
