module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neurablue: {
          500: "#3b82f6"
        },
        neurapurple: {
          500: "#a855f7"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(56, 189, 248, 0.5)"
      },
      backgroundImage: {
        "neura-gradient":
          "radial-gradient(circle at top, rgba(56,189,248,0.3), transparent 60%), radial-gradient(circle at bottom, rgba(168,85,247,0.25), transparent 55%)"
      }
    }
  },
  plugins: []
};