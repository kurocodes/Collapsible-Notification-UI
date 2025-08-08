import CollapsableNotifications from "./components/CollapsableNotifications";

const App = () => {
  return (
    <div className="h-screen w-full relative">
      {/* Crimson Depth */}
      <div
        className="absolute inset-0 -z-2"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #000000 40%, #2b0707 100%)",
        }}
      />
      <CollapsableNotifications />
    </div>
  );
};

export default App;
