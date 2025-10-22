export default function Home() {
  return (
    <div 
      className="flex flex-col min-h-screen"
      style={{ 
        backgroundColor: '#121212',
        fontFamily: 'Helvetica, Arial, sans-serif'
      }}
    >
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center">
          <img 
            src="/favicon.png" 
            alt="Arien Aviation" 
            className="h-10 w-10"
          />
        </div>
        <button 
          className="px-5 py-1 bg-white text-black rounded-2xl border border-white hover:bg-gray-100 transition-colors duration-200"
        >
          Login
        </button>
      </nav>

      {/* Main content centered vertically */}
      <div className="flex flex-col items-center justify-center flex-grow text-center">
        <h1 
          className="text-7xl font-bold mb-6"
          style={{ color: 'white' }}
        >
          Arien Aviation
        </h1>
        
        <p 
          className="text-xl mb-16"
          style={{ color: 'white' }}
        >
          New frontier for Aviation Intelligence
        </p>
        
        <p 
          className="text-sm tracking-wider"
          style={{ color: 'white' }}
        >
          COMING SOON
        </p>
      </div>

      {/* Footer at bottom */}
      <footer 
        className="text-center py-8 text-sm"
        style={{ color: 'grey' }}
      >
        © 2025 Arien Aviation. All rights reserved.
      </footer>
    </div>
  );
}
